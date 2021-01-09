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

  //collections reference
  const collectionRef = firestore.collection("users");

  // data
  const snapShot = await userRef.get();

  //collections snapshot/ data
  const collectionSnapshot = await collectionRef.get();
  // console.log(snapShot);
  console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

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

// [Moving our data -> firestore] -- 0.1). create a function the creates a collection in firestore
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  // [Moving our data -> firestore] -- 0.2). collectionKey will come from App.js
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // firestore can only process 1 request call of set() @ a time - so if our internet connection is bad it may stop setting our documents half way through thus this makes our code unpredictable.

  // we need to use batch to group all our calls together to one big SINGLE request

  //
  const batch = firestore.batch();

  // [Moving our data -> firestore] -- 0.3). objectToAdd will come from App.js

  // similar to map but does not return a new array
  objectToAdd.forEach((object) => {
    // we want to generate a new document reference and firestore to generate the new ID
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);

    batch.set(newDocRef, object);
  });

  // will fire our batch request and returns a promise
  return await batch.commit();
};

// [ firestore data -> shop data] 1). gets snapshot object and convert it to the data that we need in our App

export const convertCollectionsSnapshotToMap = (collections) => {
  // . docs -> will give querySnapshot
  const transformedCollection = collections.docs.map((doc) => {
    // .data ->method that will pull of data from snapShot
    // pull of data we need from the docs
    const { title, items } = doc.data();

    // output the final converted data
    return {
      // encodeURI - converts any string that a URL can read Hats -> hats
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    // accumulator is the key & collections will be the
    // hats = collection of hat -- stored in the { } --> hats : {hats collection}
    // initial state is an empty {}
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
console.log("hello");
