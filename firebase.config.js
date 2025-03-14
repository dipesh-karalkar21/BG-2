// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3lUY9aPFEqSziHuR599Vj-vPVMGaRl4s",
  authDomain: "bg02-7237f.firebaseapp.com",
  projectId: "bg02-7237f",
  storageBucket: "bg02-7237f.firebasestorage.app",
  messagingSenderId: "38355511419",
  appId: "1:38355511419:web:8ab9d12cea723bf43f5ade"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)