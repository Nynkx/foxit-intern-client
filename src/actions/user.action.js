import { userConstants } from "../constants";

export const loginRequest = (credencials) => ({
  type: userConstants.USER_LOGIN_REQUEST,
  payload: credencials,
});

export const loginSuccess = (user) => ({
  type: userConstants.USER_LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: userConstants.USER_LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({ type: userConstants.USER_LOGOUT });
