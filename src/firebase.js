import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "besquare-final-project.firebaseapp.com",
  projectId: "besquare-final-project",
  storageBucket: "besquare-final-project.appspot.com",
  messagingSenderId: "175419693435",
  appId: "1:175419693435:web:c20b3168d257ca1d5545de",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
