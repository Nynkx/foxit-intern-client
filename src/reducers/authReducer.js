import { userConstants } from "../constants";

let token = localStorage.getItem("token");
const initialState = {
  isAuthenticated: !(token === null),
  payload: token,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        payload: action.payload,
        error: null,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        payload: null,
        error: action.payload,
      };
    case userConstants.USER_LOGOUT:
      return {
        isAuthenticated: false,
        payload: null,
        error: null,
      };
    default:
      return state;
  }
};
