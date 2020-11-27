import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import StyledComponents from "styled-components";
import * as UIExtension from "../../../foxit-lib/UIExtension.full";
import "../../../foxit-lib/UIExtension.css";

import ScreenStateHandler from "./ScreenStateHandler";
import TemplateHandler from "../../templates/TemplateHandler";
import interact from "interactjs";
import { CButton } from "@coreui/react";

// import annotList from "./customgroup.json";

const StyledDiv = StyledComponents.div`
    height: 100%;
`;

const TemplateDesigner = (props) => {
  // const dispatch = useDispatch();
  //const pdfLoaded = useSelector((state) => state.pdf.pdfLoaded);

  var elementRef = React.useRef();
  //var templateHandler = useTemplateHandler();
  const element = elementRef.current;
  const libPath = "/foxit-lib/";
  var controlsJSON = [];
  var pdfui = new UIExtension.PDFUI({
    viewerOptions: {
      libPath,
      jr: {
        readyWorker: window.readyWorker,
      },
    },
    renderTo: element,
    appearance: UIExtension.appearances.adaptive,
    addons: [
      `${libPath}uix-addons/file-property`,
      `${libPath}uix-addons/multi-media`,
      `${libPath}uix-addons/password-protect`,
      `${libPath}uix-addons/redaction`,
      `${libPath}uix-addons/path-objects`,
      `${libPath}uix-addons/print`,
      `${libPath}uix-addons/full-screen`,
      `${libPath}uix-addons/import-form`,
      `${libPath}uix-addons/export-form`,
      `${libPath}uix-addons/undo-redo`,
    ].concat(
      UIExtension.PDFViewCtrl.DeviceInfo.isMobile
        ? []
        : `${libPath}uix-addons/text-object`
    ),
    template: `
    <webpdf>
      <viewer></viewer>
    </webpdf>
    `,
  });

  useEffect(() => {
    pdfui.addUIEventListener(
      UIExtension.UIEvents.initializationCompleted,
      () => {
        console.log("pdfui Init Completed!");
        // pdfui.getPDFViewer().then((pdfViewer) => {
        //   var stateHandlerManager = pdfViewer.getStateHandlerManager();
        //   stateHandlerManager.register(ScreenStateHandler);
        //   stateHandlerManager.switchTo("createScreen");
        // });
      }
    );

    return () => {
      //return pdfui.destroy();
    };
  }, []);

  useEffect(() => {
    if (props.pdf) {
      console.log("a");
      pdfui.getPDFViewer().then((pdfViewer) => {
        const ViewerEvents = UIExtension.PDFViewCtrl.ViewerEvents;
        pdfViewer.openPDFByFile(props.pdf).then((pdfDoc) => {
          elementRef.current = pdfDoc;
        });

        window.addEventListener("resize", () => {
          //pdfViewer.redraw();
        });

        //console.log(stateHandlerManager);

        pdfViewer.eventEmitter.on(ViewerEvents.renderFileSuccess, (pdfDoc) => {
          console.log("File Rendered!");
        });
        pdfViewer.eventEmitter.on(
          ViewerEvents.renderPageSuccess,
          (pageRender) => {
            var scale = pageRender.getScale();
            var controlItems = document.querySelectorAll(".control-item");
            //console.log(scale);

            for (var i = 0; i < controlItems.length; ++i) {
              //console.log();
            }
          }
        );

        pdfViewer.eventEmitter.on(
          ViewerEvents.zoomToSuccess,
          (oldScale, newScale) => {
            console.log(newScale);
          }
        );
      });
    }

    // console.log(elementRef.current);
  }, [props.pdf]);

  //   if (props.pdf) {
  //     pdfui.getPDFViewer().then((pdfViewer) => {
  //       const ViewerEvents = UIExtension.PDFViewCtrl.ViewerEvents;

  //       // pdfViewer.openPDFByFile(props.pdf);

  //       // pdfViewer.eventEmitter.on(ViewerEvents.renderFileSuccess, (pdfDoc) => {
  //       //   console.log("File Rendered!");
  //       // });

  //       // pdfViewer.eventEmitter.on(ViewerEvents.openFileSuccess, (pdfDoc) => {
  //       //   console.log("File Opened!");
  //       // });

  //       // pdfViewer.eventEmitter.on(ViewerEvents.openFileFailed, () => {
  //       //   console.error("cannot open file!");
  //       // });

  //       // pdfViewer.eventEmitter.on(
  //       //   ViewerEvents.renderPageSuccess,
  //       //   (pageRender) => {}
  //       // );
  //       // pdfViewer.eventEmitter.on(
  //       //   ViewerEvents.pageLayoutRedraw,
  //       //   (pageRender) => {
  //       //     console.log("Page Layout Redrawn!");
  //       //   }
  //       // );
  //     });
  //   }

  const createControl = (controlJSON, control) => {
    if (!control.id) {
      control.id = controlJSON.id =
        controlJSON.type + "-" + new Date().getTime();
      controlsJSON.push(controlJSON);
      console.log(controlsJSON);
    } else {
      controlsJSON = controlsJSON.map((item) => {
        if (item.id === controlJSON.id) return controlJSON;
        return item;
      });
      console.log(controlsJSON);
    }
  };

  const deleteControl = (control) => {
    var id = control.id;
    control.parentElement.removeChild(control);
    for (var i = 0; i < controlsJSON.length; ++i) {
      if (controlsJSON[i].id === id) {
        controlsJSON.splice(i, 1);
        return;
      }
    }
  };

  return (
    <>
      <TemplateHandler
        handleControlDrop={createControl}
        controlUpdate=""
        controlDelete={deleteControl}
      ></TemplateHandler>
      <div className="border template-wrapper">
        <div className="template-header">
          <CButton color="primary" className="mr-1">
            Create
          </CButton>
          <CButton color="danger" className="mr-1">
            Cancel
          </CButton>
        </div>
        <div className="border template-design-viewer">
          <StyledDiv ref={elementRef} />
        </div>
        <div className="p-1 template-design-menu">
          <div className="control-container">
            <div
              className="control-item tpl-draggable"
              name="ctrl-textbox"
              data-type="textbox"
            >
              txt
            </div>
            <div
              className="control-item tpl-draggable"
              name="ctrl-checkbox"
              data-type="checkbox"
            >
              chk
            </div>
            <div
              className="control-item tpl-draggable"
              name="ctrl-svslabel"
              data-type="svs"
            >
              svs
            </div>
          </div>
          <div>
            <form>
              <div className="d-flex">
                <div className="form-group px-1">
                  <label htmlFor="txt_x">x</label>
                  <input
                    type="text"
                    name=""
                    id="txt_x"
                    className="form-control"
                  />
                </div>
                <div className="form-group px-1">
                  <label htmlFor="txt_y">y</label>
                  <input
                    type="text"
                    name=""
                    id="txt_y"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group px-1">
                  <label htmlFor="txt_width">width</label>
                  <input
                    type="text"
                    name=""
                    id="txt_width"
                    className="form-control"
                  />
                </div>
                <div className="form-group px-1">
                  <label htmlFor="">height</label>
                  <input
                    type="text"
                    name=""
                    id="txt_height"
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDesigner;
