import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSucess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

// [REDUX SAGA ] 3-A). ASYNC SAGA functional refactored code.
export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    // format received {user} to in to firebase utils
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );

    // get data of formatted user
    // API REQUEST
    const userSnapshot = yield userRef.get();

    // put() - put things back into our regular redux flow
    // store received data in REDUX STORE
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
  } catch (error) {
    put(signInFailure(error));
  }
}

// [REDUX SAGA ] 3.) Async Saga - handles fetching of data and processing of data from firestore database

export function* signInWithGoogle() {
  try {
    // get user from google // API REQUEST
    const { user } = yield auth.signInWithPopup(googleProvider);

    // [REDUX SAGA ] 3-A). ASYNC SAGA functional refactored code.
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    //get user from email&password API REQUEST
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    // [REDUX SAGA ] 3-A). ASYNC SAGA functional refactored code.
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSucess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

// ----------------------------------------------------------

// [REDUX SAGA - LISTENERS ] 2.) listens for action from COMPONENT
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSucess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// ----------------------------------------------------------

export function* userSaga() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSucess),
  ]);
}
