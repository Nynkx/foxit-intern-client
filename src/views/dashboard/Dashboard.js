import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

// import MainChartExample from "../charts/MainChartExample.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
const TransitionButton = lazy(() => import("../widgets/TransitionButton"));

const Dashboard = () => {
  React.useEffect(() => {
    console.log("component mounted!");
  });
  return (
    <>
      <CRow>
        <CCol>
          <div className="stepbar">
            <div className="stepbar-item">
              <div className="stepbar-item-label">1. Upload Template</div>
              <div className="stepbar-item-arrow"></div>
            </div>
            <div className="stepbar-item">
              <div className="stepbar-item-label">2. Template Design</div>
              <div className="stepbar-item-arrow"></div>
            </div>
            <div className="stepbar-item">
              <div className="stepbar-item-label">3. Make Sign Doc</div>
              <div className="stepbar-item-arrow"></div>
            </div>
            <div className="stepbar-item">
              <div className="stepbar-item-label">4. Sign Doc</div>
              <div className="stepbar-item-arrow"></div>
            </div>
            <div className="stepbar-item">
              <div className="stepbar-item-label">5. Complete</div>
            </div>
          </div>
          <script>$()</script>
        </CCol>
      </CRow>

      <CRow className="mt-5 shortcutsbar">
        <CCol>
          <TransitionButton
            to="/templates/create"
            name="Create Templates"
            icon={
              <CIcon
                content={freeSet.cilCloudUpload}
                width="25%"
                height="25%"
              ></CIcon>
            }
          ></TransitionButton>
        </CCol>
        <CCol>
          <TransitionButton
            to="/templates"
            name="Templates"
            icon={
              <CIcon content={freeSet.cilFile} width="25%" height="25%"></CIcon>
            }
          ></TransitionButton>
        </CCol>
        <CCol>
          <TransitionButton
            to="/documents"
            name="Documents"
            icon={
              <CIcon
                content={freeSet.cilFolderOpen}
                width="25%"
                height="25%"
              ></CIcon>
            }
          ></TransitionButton>
        </CCol>
        <CCol>
          <TransitionButton
            to="/completed-documents"
            name="Completed Documents"
            icon={
              <CIcon
                content={freeSet.cilFolder}
                width="25%"
                height="25%"
              ></CIcon>
            }
          ></TransitionButton>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
