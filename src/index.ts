import { Clipboard } from './clipboard';

declare let window;

window.Clipboard = new Clipboard();

const CLIPBOARD_ATTRIBUTE = 'clipboard';
const CLIPBOARD_ATTRIBUTE_SUCCESS = 'clipboard-success';
const CLIPBOARD_ATTRIBUTE_ERROR = 'clipboard-error';

const eventListenerClick = (evt) => {
    window.Clipboard.copy(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE), () => {
        eval(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE_SUCCESS));
    }, (err) => {
        eval(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE_ERROR));
    });
}

const observeElementClick = (elm) => {
    //REMOVE DUPLICATE LISTENER IF EXISTS
    elm.removeEventListener("click", eventListenerClick);
    //ADD LISTENER CLICK TO COPY TEXT
    elm.addEventListener("click", eventListenerClick);
}

//OBSERVE ELEMENTS RENDER
document.addEventListener("DOMSubtreeModified", (event:any) => {
    if(!event.target || !event.target.querySelectorAll) return;
    let elms = event.target.querySelectorAll('['+CLIPBOARD_ATTRIBUTE+']');
    Array.from(elms).forEach((el) => observeElementClick(el));
});

export default window.Clipboard;