import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";

export default combineReducers({ sidebar: sidebarReducer, auth: authReducer });
