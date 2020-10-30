import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "../store";

import { loginSuccess, loginFailure } from "../actions/user.action";
import { login } from "../services/user.service";
import { userConstants } from "../constants";

export function* loginWithCredencials({ payload: { email, password } }) {
  try {
    const user = yield login(email, password);
    localStorage.setItem("token", user.data.token);

    yield put(loginSuccess(user.data.token));
    history.push("/");
  } catch (err) {
    yield put(loginFailure(err));
  }
}

export function* onLoginRequest() {
  yield takeLatest(userConstants.USER_LOGIN_REQUEST, loginWithCredencials);
}

export function* authSaga() {
  yield all([call(onLoginRequest)]);
}
