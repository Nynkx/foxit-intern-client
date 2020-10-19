import React, { Component } from "react";
import { CCard, CCardBody, CCardHeader, CLink } from "@coreui/react";

function TransitionButton(props) {
  return (
    <>
      <CLink to={props.to} className="plain-link">
        <CCard className="bottom-layer">
          <CCardBody className="before">&nbsp;</CCardBody>
          <CCardHeader className="overlay text-center border-0">
            {props.icon}
          </CCardHeader>
          <CCardBody className="overlay text-center h5">{props.name}</CCardBody>
          <CCardBody className="after">&nbsp;</CCardBody>
        </CCard>
      </CLink>
    </>
  );
}

export default TransitionButton;
