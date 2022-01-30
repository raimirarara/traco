// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ4sVgSBgHxo_mAMp03PZBHBAqvu6vNzY",
  authDomain: "traco-8930d.firebaseapp.com",
  projectId: "traco-8930d",
  storageBucket: "traco-8930d.appspot.com",
  messagingSenderId: "422535576345",
  appId: "1:422535576345:web:c4230b17bcfc2b6d69e388",
  measurementId: "G-KE76QFWBGS",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const db = firebase.firestore();
export const FirebaseFieldValue = firebase.firestore.FieldValue;
export const FirebaseTimestamp = firebase.firestore.Timestamp;
