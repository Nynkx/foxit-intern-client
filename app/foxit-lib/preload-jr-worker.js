!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.preloadJrWorker=t():e.preloadJrWorker=t()}(self,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(e.workerPath||"")+"WebPDFJRWorker.js?h="+n.h,r=new Worker(t);r.terminate(),r=new Worker(t);var o="FoxitPDFSDKForWeb_JREngineCache_",a=o+"wasmBinary",i=function(){var e=!1,t=void 0,r=void 0,n=void 0,o=[];return{resolve:function(n){e||(e=!0,t=1,r=n),a()},reject:function(r){e||(e=!0,t=2,n=r),a()},promise:{then:function(e,t){o.push([e,t]),a()}}};function a(){var e=void 0;switch(t){case 1:e=r;break;case 2:e=n;break;default:return}for(var a=0,i=o.length;a<i;a++)o[a][t-1](e);o=[]}}(),c=i.promise;r.addEventListener("message",(function e(t){var n,o=t.data,c=o.params;if(n=o.uiListener)switch(n){case"wasmBinary":localStorage.setItem(a,c);break;case"asmMem":localStorage.setItem("FoxitPDFSDKForWeb_JREngineCache_asmMem",c);break;case"asmJs":localStorage.setItem("FoxitPDFSDKForWeb_JREngineCache_asmJs",c)}else{var s=o.callId;if(s)"compatibilityURL"===s&&r.postMessage({backId:o.backId,params:URL.createObjectURL(c)});else if("initJREngine"===(s=o.id)){var u=+o.type;i[["resolve","reject"][u]](c),r.removeEventListener("message",e),r.removeEventListener("error",e)}}})),r.addEventListener("error",(function(e){r.terminate(),i.reject(e)}));var s={},u=void 0;return(u=localStorage.getItem(a))&&(s.wasmBinary=u),(u=localStorage.getItem("FoxitPDFSDKForWeb_JREngineCache_asmMem"))&&(s.asmMem=u),(u=localStorage.getItem("FoxitPDFSDKForWeb_JREngineCache_asmJs"))&&(s.asmJs=u),e.cache=s,e.compatibilityURL="compatibilityURL",e.d=location.href,r.postMessage({name:"initJREngine",params:e,id:"initJREngine"}),{worker:r,initJREnginePromise:c}};var n=r(1)},function(e,t,r){"use strict";r.r(t),r.d(t,"h",(function(){return n}));var n="c8d66aa80b7cabf8be5f1fdf02c4134a"}]).default}));