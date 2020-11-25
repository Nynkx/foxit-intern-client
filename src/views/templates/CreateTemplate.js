import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
} from "@coreui/react";

import TemplateDesigner from "./TemplateDesigner";
import TemplateHandler from "./TemplateHandler";

const CreateTemplate = function () {
  const [modalShow, setModalShow] = useState(true);
  const [PDFFile, setPDFFile] = useState();

  const handleDropFile = (e) => {
    e.preventDefault();

    var files = e.dataTransfer.files;
    if (validateFiles(files)) {
      var fileInput = document.querySelector("#file-input");
      fileInput.files = files;
    }
  };

  const validateFiles = (files) => {
    files.forEach((file) => {
      if (file.type !== "application/pdf") return false;
    });
    return true;
  };

  const handleChange = (e) => {
    if (e.target.files == null) return;
    setModalShow(false);
    setPDFFile(e.target.files[0]);
  };

  return (
    <>
      <CModal show={modalShow} centered closeOnBackdrop={false}>
        <CModalHeader>Upload Template</CModalHeader>
        <CModalBody>
          <label
            id="dragdropfield"
            className="border bg-light"
            onDrop={handleDropFile}
            onDragOver={(e) => e.preventDefault()}
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div id="dnd-text">drag 'n drop file here or click to select</div>
            <input
              type="file"
              id="file-input"
              accept="application/pdf"
              hidden
              onChange={handleChange}
            />
          </label>
        </CModalBody>
        <CModalFooter style={{ background: "#fcfafa" }}>
          <div className="d-flex flex-row-reverse">
            <CButton className="btn-light">Cancel</CButton>
          </div>
        </CModalFooter>
      </CModal>

      <TemplateDesigner pdf={PDFFile}></TemplateDesigner>
    </>
  );
};

export default CreateTemplate;
