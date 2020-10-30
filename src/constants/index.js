//import { Provider } from "react-redux";

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export const userConstants = {
  USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGOUT: "USER_LOGOUT",
};
