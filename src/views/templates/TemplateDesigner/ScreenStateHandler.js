import * as UIExtension from "../../../foxit-lib/UIExtension.full";
import "../../../foxit-lib/UIExtension.css";

var PDFViewCtrl = UIExtension.PDFViewCtrl;
window.$ = UIExtension.jQuery;

var ScreenStateHandler = function () {};

_inherits(ScreenStateHandler, PDFViewCtrl.IStateHandler);

ScreenStateHandler.getStateName = () => {
  return "createScreen";
};

ScreenStateHandler.prototype.pageHandler = (pageRender) => {
  var $handler = pageRender.$handler;
  let eHandler = $handler[0];
};

ScreenStateHandler.prototype.out = function () {
  this.destroyPageHandler();
};

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

export default ScreenStateHandler;
