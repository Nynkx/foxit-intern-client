import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import { createBrowserHistory } from "history";

import rootSaga from "./sagas/root.saga";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
