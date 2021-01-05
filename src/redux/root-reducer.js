import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

// root reducer -  overall reducer
export default combineReducers({
  user: userReducer,
});
