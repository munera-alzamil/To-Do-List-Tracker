// userService.js
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase.js'; 


export const createUser = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  return await setDoc(userRef, userData);
};

export const addTaskToUser = async (userId, taskData) => {
  const tasksCollection = collection(doc(db, 'users', userId), 'tasks');
  return await addDoc(tasksCollection, taskData);
};

export const getTasksForUser = async (userId) => {
  const tasksCollection = collection(doc(db, 'users', userId), 'tasks');
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}; 

export const findUserById = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else {
    return null;
  }
};
