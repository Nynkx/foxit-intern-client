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
  var Hammer = UIExtension.Hammer;
  var $handler = pageRender.$handler;
  let eHandler = $handler[0];
  eHandler.addEventListener("drop", (e) => {
    addMarkup($handler);
  });
  eHandler.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  let hammer = new Hammer.Manager(eHandler, {
    recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_ALL }]],
  });
  let startPoint;

  hammer.on("panstart", (e) => {
    startPoint = getDevicePagePoint(eHandler, e);

    console.log(startPoint);
  });

  var i = 0;

  hammer.on("panmove", (e) => {
    var endPoint = { x: startPoint.x + e.deltaX, y: startPoint.y + e.deltaY };

    console.log(getRect(startPoint, endPoint));
  });
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

function addMarkup($parent) {
  let $fragment = UIExtension.jQuery(document.createDocumentFragment());
  let style = `
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    background: rgba(0, 255, 0, 0.5);
  `;

  $fragment.append(`<div style="${style}" class="control-item">asd</div>`);
  $parent.append($fragment);
}

function getDevicePagePoint(elemt, event) {
  let pageRect = elemt.getBoundingClientRect();
  var srcEvent = event.srcEvent;
  const clientX = getClientX(srcEvent),
    clientY = getClientY(srcEvent);
  return {
    x: clientX - pageRect.left - event.deltaX,
    y: clientY - pageRect.top - event.deltaY,
  };
}

function getClientX(e) {
  if ("clientX" in e) {
    return e.clientX;
  } else {
    switch (e.type) {
      case "touchstart":
      case "touchmove":
        return e.touches[0].clientX;
      case "touchend":
      case "touchcancel":
        return e.changedTouches[0].clientX;
    }
  }
}

//Gets the Y-axis coordinates of the client
function getClientY(e) {
  if ("clientY" in e) {
    return e.clientY;
  } else {
    switch (e.type) {
      case "touchstart":
      case "touchmove":
        return e.touches[0].clientY;
      case "touchend":
      case "touchcancel":
        return e.changedTouches[0].clientY;
    }
  }
}

function getRect(startPoint, endPoint) {
  var top = startPoint.y,
    left = startPoint.x,
    bottom = endPoint.y,
    right = endPoint.x;

  return { left: left, top: top, right: right, bottom: bottom };
}

const handleDrop = (e, $handler) => {
  const name = e.dataTransfer.getData("text");

  addMarkup($handler);

  // var element = document
  //   .querySelector(`.control-item[name=${name}]`)
  //   .cloneNode(true);
  // element.setAttribute(
  //   "id",
  //   name.replace("ctrl-", "") + "-" + new Date().valueOf()
  // );
  // element.className = "control-item";
  // element.setAttribute("draggable", "false");

  //e.target.appendChild(element);
  //console.log(element);
};

export default ScreenStateHandler;
