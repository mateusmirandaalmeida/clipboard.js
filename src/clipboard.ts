export class Clipboard {

    constructor(){
    }

    createFake(text: string, command: string, onSuccess: any, onError: any){
        let placeholder = document.createElement("textarea");
        placeholder.setAttribute(
            "style", 
            "position: absolute;overflow: hidden;width: 0;height: 0;top: 0;left: 0;"
        );
        placeholder.innerText = text;
        document.body.appendChild(placeholder);
        placeholder.select();
        try {
            document.execCommand(command);
            placeholder.remove();
        } catch (err) {
            onError(err);
        }
        onSuccess();
    }

    copy(text, onSuccess, onError){
        this.createFake(text, 'copy', () => {
            if(onSuccess) onSuccess();
        }, (err) => {
            if(onError) onError(err);
        });
    }

}