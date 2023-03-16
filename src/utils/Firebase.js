// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcEC0e_-11JX0FSu3g7jrh55lUvtKqjuI",
  authDomain: "application-tracker-73cd2.firebaseapp.com",
  projectId: "application-tracker-73cd2",
  storageBucket: "application-tracker-73cd2.appspot.com",
  messagingSenderId: "482493882388",
  appId: "1:482493882388:web:ef1a04e574fa181caa8701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);
export { storage, db };