import { all, call } from "redux-saga/effects";

// [all] - gets an array of function* (our sagas) and enables us to listen to all of them CONCURRENTLY

import { shopSaga } from "./shop/shop.sagas";
import { userSaga } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
export default function* rootSaga() {
  yield all([call(shopSaga), call(userSaga), call(cartSagas)]);
}
