/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Clipboard; });
var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    Clipboard.prototype.createFake = function (text, command, onSuccess, onError) {
        var placeholder = document.createElement("textarea");
        placeholder.setAttribute("style", "position: absolute;overflow: hidden;width: 0;height: 0;top: 0;left: 0;");
        placeholder.innerText = text;
        document.body.appendChild(placeholder);
        placeholder.select();
        try {
            document.execCommand(command);
            placeholder.remove();
        }
        catch (err) {
            onError(err);
        }
        onSuccess();
    };
    Clipboard.prototype.copy = function (text, onSuccess, onError) {
        this.createFake(text, 'copy', function () {
            if (onSuccess)
                onSuccess();
        }, function (err) {
            if (onError)
                onError(err);
        });
    };
    return Clipboard;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clipboard__ = __webpack_require__(0);

window.Clipboard = new __WEBPACK_IMPORTED_MODULE_0__clipboard__["a" /* Clipboard */]();
var CLIPBOARD_ATTRIBUTE = 'clipboard';
var CLIPBOARD_ATTRIBUTE_SUCCESS = 'clipboard-success';
var CLIPBOARD_ATTRIBUTE_ERROR = 'clipboard-error';
var eventListenerClick = function (evt) {
    window.Clipboard.copy(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE), function () {
        eval(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE_SUCCESS));
    }, function (err) {
        eval(evt.target.getAttribute(CLIPBOARD_ATTRIBUTE_ERROR));
    });
};
var observeElementClick = function (elm) {
    //REMOVE DUPLICATE LISTENER IF EXISTS
    elm.removeEventListener("click", eventListenerClick);
    //ADD LISTENER CLICK TO COPY TEXT
    elm.addEventListener("click", eventListenerClick);
};
//OBSERVE ELEMENTS RENDER
document.addEventListener("DOMSubtreeModified", function (event) {
    if (!event.target || !event.target.querySelectorAll)
        return;
    var elms = event.target.querySelectorAll('[' + CLIPBOARD_ATTRIBUTE + ']');
    Array.from(elms).forEach(function (el) { return observeElementClick(el); });
});
/* harmony default export */ __webpack_exports__["default"] = (window.Clipboard);


/***/ })
/******/ ]);