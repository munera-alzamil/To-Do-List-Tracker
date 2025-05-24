// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBijALYt93Qs_4MfqwqRzE1O9XxdTBUPsg",
  authDomain: "cloud-computing-project-201ed.firebaseapp.com",
  databaseURL: "https://cloud-computing-project-201ed-default-rtdb.firebaseio.com",
  projectId: "cloud-computing-project-201ed",
  storageBucket: "cloud-computing-project-201ed.appspot.com",
  messagingSenderId: "351378834414",
  appId: "1:351378834414:web:e446ef8d477b699a9e84ff",
  measurementId: "G-54JCXS5JPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc
};
