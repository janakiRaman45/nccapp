// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClHiZHDsWbnsZBv9lb5HLdugkQ-pwrEeg",
  authDomain: "nccmanagement-2f33e.firebaseapp.com",
  databaseURL: "https://nccmanagement-2f33e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nccmanagement-2f33e",
  storageBucket: "nccmanagement-2f33e.appspot.com",
  messagingSenderId: "117695831929",
  appId: "1:117695831929:web:a02f2893d88fbc73cbd9a8",
  measurementId: "G-CQ2D3BH0WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);