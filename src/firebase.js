// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQCPqP5w86KgHg4cP08DQ6g0TNaeRW9wY",
  authDomain: "clg-certi.firebaseapp.com",
  projectId: "clg-certi",
  storageBucket: "clg-certi.firebasestorage.app",
  messagingSenderId: "503412641347",
  appId: "1:503412641347:web:a3af7869a2cde956064ef6",
  measurementId: "G-WFXP7SDV4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);