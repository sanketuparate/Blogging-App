// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHkC0MQujaUyKpH-Ibg2UlSckRUKiy7e8",
  authDomain: "blogging-app-a4571.firebaseapp.com",
  projectId: "blogging-app-a4571",
  storageBucket: "blogging-app-a4571.appspot.com",
  messagingSenderId: "129071268474",
  appId: "1:129071268474:web:1e0e3a396111f4e584f1c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);