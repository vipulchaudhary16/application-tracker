import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "application-tracker-73cd2.firebaseapp.com",
  projectId: "application-tracker-73cd2",
  storageBucket: "application-tracker-73cd2.appspot.com",
  messagingSenderId: "482493882388",
  appId: "1:482493882388:web:ef1a04e574fa181caa8701"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);
export { storage, db };