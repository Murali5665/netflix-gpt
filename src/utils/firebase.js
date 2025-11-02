// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCNbMJOC9pKkgEjaPgJl5ZgMYCm-9E3Xs",
  authDomain: "netflix-gpt-8f95b.firebaseapp.com",
  projectId: "netflix-gpt-8f95b",
  storageBucket: "netflix-gpt-8f95b.firebasestorage.app",
  messagingSenderId: "132791362357",
  appId: "1:132791362357:web:8f53a1333cc85e1a6a627c",
  measurementId: "G-YQT5522KSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);