import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDmYfmcRbhFJ2st7vdgfg8HEmZcpiSzEpo",
  authDomain: "slack-clone-fa0dd.firebaseapp.com",
  projectId: "slack-clone-fa0dd",
  storageBucket: "slack-clone-fa0dd.appspot.com",
  messagingSenderId: "916973172611",
  appId: "1:916973172611:web:8b70a2f0c69d0b38a7a8b6",
  measurementId: "G-9Z5DJ0ZJ27",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, db, firebaseApp };
