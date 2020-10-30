import React, { useEffect, useState } from "react";
import StyledComponents from "styled-components";
import * as UIExtension from "../../../foxit-lib/UIExtension.full";
import "../../../foxit-lib/UIExtension.css";

import annotList from "./customgroup.json";

const StyledDiv = StyledComponents.div`
    height: 100%;
`;

const PDFViewer = () => {
  var elementRef = React.createRef();
  var pdfui = null;

  const [annotJSON, setAnnotJSON] = useState();

  const handleBtnClick = (e) => {
    pdfui.getPDFViewer().then((res) => {
      var doc = res.getPDFDocRender().getPDFDoc();

      // doc.getAnnots().then((annots) => {
      //   var annotJSON_Arr = [];
      //   annots.forEach((pageAnnots) => {
      //     var annotsInPage = [];
      //     pageAnnots.forEach((annot) => {
      //       console.log(annot);
      //       annotsInPage.push(annot.exportToJSON());
      //     });

      //     annotJSON_Arr.push(annotsInPage);
      //   });
      //   setAnnotJSON(annotJSON_Arr);
      // });
      // var doc = res.getPDFDocRender().getPDFDoc();

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
        <toolbar name="toolbar" className="fv__ui-toolbar-scrollable">
          <open-file-dropdown></open-file-dropdown>
          <create-drawings-dropdown></create-drawings-dropdown>
          
        </toolbar>

        <viewer></viewer>
      </webpdf>
      `,
    });

    pdfui.addUIEventListener(
      UIExtension.UIEvents.initializationCompleted,
      () => {
        console.log("pdfui Init Completed!");
      }
    );

    pdfui.getPDFViewer().then((pdf) => {
      pdf.eventEmitter.on(
        UIExtension.PDFViewCtrl.ViewerEvents.openFileSuccess,
        (pdfDoc) => {
          pdfDoc.loadPDFForm();
          var pdfform = pdfDoc.getPDFForm();
          console.log(typeof UIExtension.PDFViewCtrl);
          pdfDoc.importAnnotsFromJSON(annotList);
        }
      );
    });

    return () => {
      pdfui.destroy();
    };
  }, []);

  return (
    <>
      <div>
        <div>{JSON.stringify(annotJSON)}</div>
        <button onClick={handleBtnClick}>asd</button>
        <StyledDiv ref={elementRef} />
      </div>
    </>
  );
};

export default PDFViewer;
