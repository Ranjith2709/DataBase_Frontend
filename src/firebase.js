// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
 
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDFbBIiMz5SSypj7INdU6aGpZUWa9PoZbA",
    authDomain: "signin-a8370.firebaseapp.com",
    projectId: "signin-a8370",
    storageBucket: "signin-a8370.firebasestorage.app",
    messagingSenderId: "970576981516",
    appId: "1:970576981516:web:b988b057ce84f59c6fc829",
    measurementId: "G-YEWKBCJYWV",
  });
}
 
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();