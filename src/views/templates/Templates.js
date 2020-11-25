import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

import {
  // CRow,
  // CCol,
  // CDataTable,
  // CModal,
  // CModalHeader,
  // CModalBody,
  CLink,
} from "@coreui/react";

const CreateTemplate = React.lazy(() => import("./CreateTemplate"));

const Templates = () => {
  // const [modalShow, setModalShow] = useState(
  //   history.location.pathname === "/templates/create"
  // );

  return (
    <>
      <Switch>
        <Route path="/templates/create">
          <CreateTemplate></CreateTemplate>
        </Route>
        <Route>
          <CLink to="/templates/create">New Templates</CLink>
        </Route>
      </Switch>
    </>
  );
};

export default Templates;
