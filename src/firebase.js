import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDFbBIiMz5SSypj7INdU6aGpZUWa9PoZbA",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "signin-a8370.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "signin-a8370",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "signin-a8370.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "970576981516",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID || "1:970576981516:web:b988b057ce84f59c6fc829",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-YEWKBCJYWV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
