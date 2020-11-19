import React, { useEffect, useState } from "react";
import * as UIExtension from "../../foxit-lib/UIExtension.full";
import "../../foxit-lib/UIExtension.css";
import interact from "interactjs";

const TemplateHandler = (props) => {
  console.log(props.controls);
  //const pdfLoaded = useSelector((state) => state.pdf.pdfLoaded);
  const [controls, setControls] = useState([]);
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
    UIExtension.jQuery("#txt_x").val(
      parseInt(Math.abs(container.left - rect.left))
    );
    UIExtension.jQuery("#txt_y").val(
      parseInt(Math.abs(container.top - rect.top))
    );

    UIExtension.jQuery("#txt_width").val(parseInt(rect.width));
    UIExtension.jQuery("#txt_height").val(parseInt(rect.height));
    console.log();

    target.style.webkitTransform = target.style.transform = `translate(${x}px,${y}px)`;

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
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
      });
  };
  // EO event listeners

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
          var x = clone.offsetLeft;
          var y = clone.offsetTop;
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
        control.id || registerDragResize(control);

        // setControls((prevState) => [...prevState, info]);
        controlsJSON.push(info);
        console.log(controlsJSON);
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
