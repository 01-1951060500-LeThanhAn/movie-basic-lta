
import "firebase/compat/auth"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyB99_d50PQLq9ij-o1CurgUsoNAu9Yp6lU",
  authDomain: "movie-18195.firebaseapp.com",
  projectId: "movie-18195",
  storageBucket: "movie-18195.appspot.com",
  messagingSenderId: "665847399534",
  appId: "1:665847399534:web:0a8b78f4a396fc55b2927f",
});

// const fire = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(firebaseConfig);
export const db = getFirestore(firebaseConfig);
