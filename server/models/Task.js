import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import db from '../firebase.js'; 
const taskCollection = collection(db, 'tasks');

export const addTask = async (taskData) => {
  return await addDoc(taskCollection, taskData);
};

export const getAllTasks = async () => {
  const snapshot = await getDocs(taskCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (id, updates) => {
  const taskRef = doc(db, 'tasks', id);
  return await updateDoc(taskRef, updates);
};

export const deleteTask = async (id) => {
  const taskRef = doc(db, 'tasks', id);
  return await deleteDoc(taskRef);
};
