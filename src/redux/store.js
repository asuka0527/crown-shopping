import { createStore, applyMiddleware } from "redux";

// Middleware - catches action and consolog.log it
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
