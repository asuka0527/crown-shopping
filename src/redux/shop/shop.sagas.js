// [redux thunk -> redux saga] 5) import effects from saga that allows us to create actions and listen for actions

import { takeLatest, call, put, all } from "redux-saga/effects";

// [redux thunk -> redux saga] 4) move our async action here and turn it into a saga
import { ShopActionTypes } from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

// purpose of saga is to run all this functions concrurrently without blocking the stack
export function* fetchCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collections");

    // [yield] - returns a promise
    const snaphot = yield collectionRef.get();

    // [call] is the effect that invokes a method/functions
    // [call] ( 1st arg = function you want to call, 2nd arg = parameters you want to pass to the function )
    // yield
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snaphot);

    // [put] = dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // yield - pauses execution
  // yield ( 1st arg = actions we want to run, 2nd arg = function* we want to run in respond to this action )

  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSaga() {
  yield all([call(fetchCollectionsStart)]);
}
/*
// Saga Lesson - you cannot go back inside a saga

import  {takeEvery, takeLatest, take, delay, put }

[take] - take("action") return the actual payload of the action
- the rest of the code doesn't execute until this [take] is resolved
- only runs ONCE

[takeEvery] - creates a  new saga everytime
- enables our code to non-blocking, does not wait for asyncs to resolve/reject

[takeLatest] - it automatically  cancel all the previous actions and only fire the latest action 

[delay] = setTimeout(milliseconds)
yield delay (5000)
*/
