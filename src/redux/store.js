import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

// Middleware - catches action and consolog.log it
import logger from "redux-logger";
// [redux thunk -> redux saga] 1)
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";

// [redux thunk -> redux saga] 2). createSageMiddleware() can take in an object for other configurations we might need
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// [redux thunk -> redux saga] 3) add in the individual saga code (that we write) into the run(ourSagaCodes)

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default { store, persistor };
