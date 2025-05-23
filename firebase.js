import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); //  هذا يربط Firestore

export { db };
