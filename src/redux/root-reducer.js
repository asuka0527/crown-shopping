import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
// root reducer -  overall reducer
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
