import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBl-vHtJu27tb0O9DIOPfsXkf_Wsfe6Rn0",
  authDomain: "crown-shopping-5b82f.firebaseapp.com",
  projectId: "crown-shopping-5b82f",
  storageBucket: "crown-shopping-5b82f.appspot.com",
  messagingSenderId: "928277973705",
  appId: "1:928277973705:web:015a4d49d537b2b4fcdb18",
};

firebase.initializeApp(config);

// API request
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // docReference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // data
  const snapShot = await userRef.get();

  console.log(snapShot);

  // if there is No data create user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
