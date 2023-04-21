import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "storage-2e260.firebaseapp.com",
  projectId: "storage-2e260",
  storageBucket: "storage-2e260.appspot.com",
  messagingSenderId: "61588023842",
  appId: "1:61588023842:web:abc3a5eb53c6eda983787b",
  measurementId: "G-4PPW8YG347"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);
export { storage, db };