//npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBijALYt93Qs_4MfqwqRzE1O9XxdTBUPsg",
  authDomain: "cloud-computing-project-201ed.firebaseapp.com",
  databaseURL: "https://cloud-computing-project-201ed-default-rtdb.firebaseio.com",
  projectId: "cloud-computing-project-201ed",
  storageBucket: "cloud-computing-project-201ed.firebasestorage.app",
  messagingSenderId: "351378834414",
  appId: "1:351378834414:web:e446ef8d477b699a9e84ff",
  measurementId: "G-54JCXS5JPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);