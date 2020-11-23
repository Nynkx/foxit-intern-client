import React, { useEffect, useState } from "react";
import * as UIExtension from "../../foxit-lib/UIExtension.full";
import "../../foxit-lib/UIExtension.css";
import interact from "interactjs";

const TemplateHandler = (props) => {
  //console.log(props.controls);
  //const pdfLoaded = useSelector((state) => state.pdf.pdfLoaded);
  //const [controls, setControls] = useState([]);
  var controlsJSON = [];
  // event listeners
  const dragStartListener = (e) => {
    e.target &&
      e.target.classList.contains("tpl-draggable") &&
      e.interaction.stop();
  };

  const dragMoveListener = (e) => {
    var target = e.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;

    var container = e.target.parentNode.getBoundingClientRect();
    var rect = e.target.getBoundingClientRect();

    target.style.transform = target.style.webkitTransform = `translate(${x}px,${y}px)`;

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    if (e.dropzone) {
      showParam({
        top: Math.abs(container.left - rect.left),
        left: Math.abs(container.top - rect.top),
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const dragEndListener = (e) => {
    e.relatedTarget
      ? console.log("control dropped on dropzone!")
      : e.target.parentNode.removeChild(e.target);
  };

  const registerDragResize = function (elmt) {
    interact(elmt || ".tpl-resizeable")
      .draggable({
        snap: {
          targets: [interact.createSnapGrid({ x: 1, y: 1 })],
        },
        listeners: {
          start: dragStartListener,
          move: dragMoveListener,
          end: dragEndListener,
        },
      })
      .resizable({
        margin: 5,
        edges: {
          top: true,
          left: true,
          bottom: true,
          right: true,
        },
        inertia: true,
      })
      .on("resizemove", (e) => {
        var control = e.target;
        let x = parseFloat(control.getAttribute("data-x")) || 0;
        let y = parseFloat(control.getAttribute("data-y")) || 0;
        x += e.deltaRect.left;
        y += e.deltaRect.top;

        control.style.width = e.rect.width + "px";
        control.style.height = e.rect.height + "px";
        control.style.transform = control.style.webkitTransform = `translate(${x}px, ${y}px)`;

        control.setAttribute("data-x", x);
        control.setAttribute("data-y", y);

        var rectInfo = {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        };
        var controlRect = control.getBoundingClientRect();
        var parentRect = control.parentNode.getBoundingClientRect();

        rectInfo.top = Math.abs(parentRect.top - controlRect.top);
        rectInfo.left = Math.abs(parentRect.left - controlRect.left);
        rectInfo.bottom = rectInfo.top + controlRect.height;
        rectInfo.right = rectInfo.left + controlRect.width;
        rectInfo.width = controlRect.width;
        rectInfo.height = controlRect.height;

        showParam(rectInfo);
      })
      .on("resizeend", (e) => {
        var control = e.target;
        var dropzone = e.target.parentNode;
        var dropzoneRect = dropzone.getBoundingClientRect();
        var controlRect = control.getBoundingClientRect();

        var Rect = {
          top: Math.abs(dropzoneRect.top - controlRect.top),
          left: Math.abs(dropzoneRect.left - controlRect.left),
          bottom:
            Math.abs(dropzoneRect.top - controlRect.top) + controlRect.height,
          right:
            Math.abs(dropzoneRect.left - controlRect.left) + controlRect.width,
          width: controlRect.width,
          height: controlRect.height,
        };

        control.style.webkitTransform = control.style.transform = "";
        control.style.top = Rect.top + "px";
        control.style.left = Rect.left + "px";
        control.style.width = Rect.width + "px";
        control.style.height = Rect.height + "px";
        control.setAttribute("data-x", 0);
        control.setAttribute("data-y", 0);
      });
  };
  // EO event listeners

  const showParam = function (info) {
    const query = document.querySelector.bind(document);

    query("#txt_x").value = parseInt(info.left);
    query("#txt_y").value = parseInt(info.top);
    query("#txt_width").value = parseInt(info.width);
    query("#txt_height").value = parseInt(info.height);
  };

  //   register draggable
  useEffect(() => {
    interact(".tpl-draggable")
      .draggable({
        listeners: {
          start: dragStartListener,
          move: dragMoveListener,
          end: dragEndListener,
        },
      })
      .on("move", (e) => {
        var interaction = e.interaction;
        if (interaction.pointerIsDown && !interaction.interacting()) {
          var original = e.currentTarget;
          var clone = e.currentTarget.cloneNode(true);
          // var x = clone.offsetLeft;
          // var y = clone.offsetTop;
          clone.style.position = "absolute";
          clone.style.left = e.currentTarget.offsetLeft + "px";
          clone.style.top = e.currentTarget.offsetTop + "px";
          clone.style.setProperty("z-index", "101");
          clone.classList.remove("tpl-draggable");
          original.parentNode.appendChild(clone);
          interaction.start({ name: "drag" }, e.interactable, clone);
        }
      });

    interact(".fv__pdf-page-handler-container").dropzone({
      ondrop: (e) => {
        var control = e.relatedTarget;
        var dropzone = e.target;
        var dropzoneRect = dropzone.getBoundingClientRect();
        var controlRect = control.getBoundingClientRect();

        var Rect = {
          top: Math.abs(dropzoneRect.top - controlRect.top),
          left: Math.abs(dropzoneRect.left - controlRect.left),
          bottom:
            Math.abs(dropzoneRect.top - controlRect.top) + controlRect.height,
          right:
            Math.abs(dropzoneRect.left - controlRect.left) + controlRect.width,
          width: controlRect.width,
          height: controlRect.height,
        };

        control.style.webkitTransform = control.style.transform = "";
        control.style.top = Rect.top + "px";
        control.style.left = Rect.left + "px";
        control.style.width = Rect.width + "px";
        control.style.height = Rect.height + "px";
        control.style.margin = "0";
        control.style.cursor = "move";

        control.setAttribute("data-x", 0);
        control.setAttribute("data-y", 0);
        dropzone.appendChild(control);

        var info = {
          id: control.id,
          type: control.getAttribute("data-type"),
          pageNo: dropzone.parentNode.getAttribute("data-index"),
          deviceRect: Rect,
        };
        if (!control.id) {
          registerDragResize(control);
          control.addEventListener("click", (e) => {
            e.target.parentNode
              .querySelectorAll(".control-item")
              .forEach((elmt) => {
                elmt.classList.remove("control-active");
              });

            e.target.classList.add("control-active");
          });
          control.addEventListener("dblclick", (e) => {
            console.log("double clicked!");
          });
        }

        // setControls((prevState) => [...prevState, info]);
        // controlsJSON.push(info);
        // console.log(controlsJSON);
        props.handleControlDrop(info, control);
      },
    });
    return () => {
      return;
    };
  }, []);

  //console.log(controls);
  return null;
};

export default TemplateHandler;
