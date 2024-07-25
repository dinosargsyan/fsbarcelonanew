// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPQHFwhCOrGwNTvem75eJ9Gx2lDf6cyA8",
  authDomain: "fsbarcelona-f6ff6.firebaseapp.com",
  databaseURL:
    "https://fsbarcelona-f6ff6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "fsbarcelona-f6ff6",
  storageBucket: "fsbarcelona-f6ff6.appspot.com",
  messagingSenderId: "861942463832",
  appId: "1:861942463832:web:7af1fc386183af26b0392d",
  measurementId: "G-R4970SGV9B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { database, db, storage };
