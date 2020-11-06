import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

import {
  CRow,
  CCol,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import { history } from "../../store";
import PDFViewer from "../widgets/PDFViewer";

const Templates = () => {
  const [modalShow, setModalShow] = useState(
    history.location.pathname === "/templates/create"
  );
  const [viewer, setViewer] = useState();

  useEffect(() => {}, []);

  const toggle = () => {
    setModalShow(!modalShow);
  };

  const handleDropFile = (e) => {
    e.preventDefault();

    var files = e.dataTransfer.files;
    if (validateFiles(files)) {
      var fileInput = document.querySelector("#file-input");
      fileInput.files = files;
      loadPDFViewer(files);
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
    loadPDFViewer(e.target.files);
  };

  const loadPDFViewer = (files) => {
    setViewer(<PDFViewer pdf={files[0]}></PDFViewer>);
    toggle();
  };

  return (
    <>
      <Switch>
        <Route
          path="/templates/create"
          render={(props) => (
            <CModal show={modalShow} onClose={toggle}>
              <CModalBody>
                <label
                  id="dragdropfield"
                  className="border"
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
                  <div id="dnd-text">
                    drag 'n drop file here or click to select
                  </div>
                  <input
                    type="file"
                    id="file-input"
                    accept="application/pdf"
                    hidden
                    onChange={handleChange}
                  />
                </label>
              </CModalBody>
            </CModal>
          )}
        ></Route>
      </Switch>
      {viewer == null ? (
        <Link
          to={{
            pathname: "/templates/create",
          }}
          onClick={toggle}
        >
          New Templates
        </Link>
      ) : (
        ""
      )}

      {viewer}
    </>
  );
};

export default Templates;
