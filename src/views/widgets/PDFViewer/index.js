import React, { useEffect, useState } from "react";
import StyledComponents from "styled-components";
import * as UIExtension from "../../../foxit-lib/UIExtension.full";
import "../../../foxit-lib/UIExtension.css";

import ScreenStateHandler from "./ScreenStateHandler";

// import annotList from "./customgroup.json";

const StyledDiv = StyledComponents.div`
    height: 100%;
`;

const PDFViewer = (props) => {
  var elementRef = React.createRef();
  var pdfui = null;

  const [annotJSON, setAnnotJSON] = useState();

  const handleBtnClick = (e) => {
    pdfui.getPDFViewer().then((res) => {
      var doc = res.getPDFDocRender().getPDFDoc();

      doc.exportAnnotsToJSON().then((annotsJSON) => {
        setAnnotJSON(annotsJSON);
      });
    });
  };

  useEffect(() => {
    const element = elementRef.current;
    const libPath = "/foxit-lib/";
    pdfui = new UIExtension.PDFUI({
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

    pdfui.addUIEventListener(
      UIExtension.UIEvents.initializationCompleted,
      () => {
        pdfui.getPDFViewer().then((viewer) => {
          viewer.openPDFByFile(props.pdf);
        });
        console.log("pdfui Init Completed!");
      }
    );

    pdfui.getPDFViewer().then((pdf) => {
      pdf.eventEmitter.on(
        UIExtension.PDFViewCtrl.ViewerEvents.openFileSuccess,
        (pdfDoc) => {
          console.log(pdfDoc.getPageCount());

          var stateHandlerManager = pdf.getStateHandlerManager();
          stateHandlerManager.register(ScreenStateHandler);
          stateHandlerManager.switchTo("createScreen");
        }
      );

      pdf.eventEmitter.on(
        UIExtension.PDFViewCtrl.ViewerEvents.pageLayoutRedraw,
        (pageRender) => {
          var $handler = pageRender.$handler;
        }
      );
    });

    var controlItems = document.querySelectorAll(".draggable");

    controlItems.forEach((controlItem) => {
      controlItem.setAttribute("draggable", "true");
      controlItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.getAttribute("name"));
      });
    });

    return () => {
      pdfui.destroy();
    };
  }, []);

  return (
    <>
      <div className="template-wrapper">
        <div className="border template-viewer">
          <StyledDiv ref={elementRef} />
        </div>
        <div className="border template-menu">
          <div className="control-container">
            <div className="control-item draggable" name="ctrl-textbox">
              txt
            </div>
            <div className="control-item draggable" name="ctrl-checkbox">
              chk
            </div>
            <div className="control-item draggable" name="ctrl-svslabel">
              svs
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
