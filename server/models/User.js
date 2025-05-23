// userService.js
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase.js'; 

const usersCollection = collection(db, 'users');


export const createUser = async (userData) => {
  return await addDoc(usersCollection, userData);
};

export const findUser = async (username, password) => {
  const q = query(usersCollection, where('username', '==', username), where('password', '==', password));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};
export const findUserById = async (id) => {
  const userRef = doc(db, 'users', id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else {
    return null;
  }
};
