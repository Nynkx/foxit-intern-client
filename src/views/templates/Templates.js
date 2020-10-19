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

const Templates = () => {
  const [modalShow, setModalShow] = useState(
    history.location.pathname === "/templates/create"
  );

  useEffect(() => {}, []);

  const toggle = () => {
    setModalShow(!modalShow);
  };

  const handleDropFile = (e) => {
    e.preventDefault();
    var files = e.dataTransfer.files;
    if (validateFiles(files))
      return (document.querySelector("#file-input").files = files);

    console.log("asd");
  };

  const validateFiles = (files) => {
    files.forEach((file) => {
      if (file.type !== "application/pdf") return false;
    });
    return true;
  };

  return (
    <>
      <Switch>
        <Route
          path="/templates/create"
          render={(props) => (
            <CModal show={modalShow} onClose={toggle}>
              <CModalBody>
                <form method="post">
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
                    />
                  </label>
                </form>
              </CModalBody>
            </CModal>
          )}
        ></Route>
      </Switch>
      <Link
        to={{
          pathname: "/templates/create",
        }}
        onClick={toggle}
      >
        New Templates
      </Link>
    </>
  );
};

export default Templates;
