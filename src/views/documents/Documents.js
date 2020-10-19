import React, { useState } from "react";
import userInstance from "../../apis/users";
import {
  CRow,
  CCol,
  CDataTable,
  CButton,
  CCollapse,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { data } from "./data";

function Documents() {
  React.useEffect(() => {}, []);

  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleDetails = (idx) => {
    const pos = details.indexOf(idx);
    let newDetails = details.slice();

    if (pos !== -1) {
      newDetails.splice(pos, 1);
    } else {
      newDetails = [...details, idx];
    }
    setDetails(newDetails);
  };

  const getTag = (prevSigner, currentSigner) => {
    return currentSigner.order === 0
      ? "tag-blue"
      : typeof prevSigner === "undefined" || prevSigner.order === 0
      ? "tag-green"
      : "";
  };

  return (
    <>
      <CRow>
        <CCol>
          <h1>Documents: {data.length}</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="p-2">
            <CDataTable
              items={data}
              fields={[
                { key: "name", _classes: "align-middle" },
                { key: "status", _classes: "align-middle" },
                { key: "signers", _classes: "align-middle" },
                { key: "size", _classes: "align-middle" },
                { key: "created", _classes: "align-middle" },
                { key: "modified", _classes: "align-middle" },
                { key: "show_details", label: "" },
              ]}
              scopedSlots={{
                signers: (item, idx) => (
                  <>
                    <td className="align-middle">
                      <div role="list">
                        {item.signers.map((signer, idx) => (
                          <>
                            <div role="listitem" className="item">
                              <div
                                className={
                                  "tag " + getTag(item.signers[idx - 1], signer)
                                }
                              >
                                {signer.name}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </td>
                  </>
                ),
                show_details: (item, idx) => (
                  <>
                    <td className="align-middle">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        hover="true"
                        onClick={() => {
                          toggleDetails(idx);
                        }}
                      >
                        {details.includes(idx) ? "Hide" : "Show"}
                      </CButton>
                    </td>
                  </>
                ),
                details: (item, idx) => (
                  <>
                    <CCollapse show={details.includes(idx)}>
                      <CCardBody>
                        <h4>Activities</h4>
                        {item.logs.map((log, idx) => (
                          <>
                            <div key={"asd" + idx}>- {log}</div>
                          </>
                        ))}
                      </CCardBody>
                    </CCollapse>
                  </>
                ),
              }}
              pagination
              itemsPerPage={5}
            ></CDataTable>
            <div>
              <div className="tag">Unsigned</div>
              <div className="tag tag-blue">Signed</div>
              <div className="tag tag-green">Next Signer</div>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default Documents;
