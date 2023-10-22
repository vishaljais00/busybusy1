// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgvngW9D_lL9KHWQVStiRQJw3ZhXPW_vA",
  authDomain: "busybusy1-4272f.firebaseapp.com",
  projectId: "busybusy1-4272f",
  storageBucket: "busybusy1-4272f.appspot.com",
  messagingSenderId: "1068231278181",
  appId: "1:1068231278181:web:0fb83cf57e43b4f260508c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);