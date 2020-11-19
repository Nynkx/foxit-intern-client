import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";
import { pdfReducer } from "./pdfReducer";

export default combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  pdf: pdfReducer,
});
