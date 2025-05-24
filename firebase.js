import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"; 

const firebaseConfig = {
  piKey: "AIzaSyBijALYt93Qs_4MfqwqRzE1O9XxdTBUPsg",
  authDomain: "cloud-computing-project-201ed.firebaseapp.com",
  databaseURL: "https://cloud-computing-project-201ed-default-rtdb.firebaseio.com",
  projectId: "cloud-computing-project-201ed",
  storageBucket: "cloud-computing-project-201ed.appspot.com", // ✅ Fixed typo here
  messagingSenderId: "351378834414",
  appId: "1:351378834414:web:e446ef8d477b699a9e84ff",
  measurementId: "G-54JCXS5JPV"
};

// initalising
const app = initializeApp(firebaseConfig);
const auth = getAnalytics(app);
const db = getFirestore(app); 

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
};