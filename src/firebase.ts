// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqMZmzz2cQuEWe8ZBHV3e0b97hU1rPi84",
  authDomain: "workscape-4f042.firebaseapp.com",
  projectId: "workscape-4f042",
  storageBucket: "workscape-4f042.appspot.com",
  messagingSenderId: "568317655576",
  appId: "1:568317655576:web:88ffe09d652502aa34216d",
  measurementId: "G-J7008B5D0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);