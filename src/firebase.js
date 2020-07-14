import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCFqcA-C43Ofk4AqoyV5jk6AHjiXp1VZME",
  authDomain: "todo-firebase-77d9a.firebaseapp.com",
  databaseURL: "https://todo-firebase-77d9a.firebaseio.com",
  projectId: "todo-firebase-77d9a",
  storageBucket: "todo-firebase-77d9a.appspot.com",
  messagingSenderId: "954247412954",
  appId: "1:954247412954:web:2411de1972edc3660939e3",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
