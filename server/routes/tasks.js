const express = require('express');  
const router = express.Router();  

const {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} = require('firebase/firestore');
const db = require('../firebase.js');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Reference: users/{userId}/tasks
const getUserTasksCollection = (userId) => {
  return collection(db, 'users', userId, 'tasks');
};

router.post('/', async (req, res) => {  
    const { title, description, dueDate, priority } = req.body;  
    const userId = req.user.id;
    
    try {  
       const taskData = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const tasksCollection = getUserTasksCollection(userId);
    const docRef = await addDoc(tasksCollection, taskData);

    res.status(201).json({ id: docRef.id, ...taskData });
    }catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
});  

//read all tasks
router.get('/', async (req, res) => {  
     const userId = req.user.id;
    try {  
        const tasksCollection = getUserTasksCollection(userId);
    const snapshot = await getDocs(tasksCollection);

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(tasks);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
});  


// UPDATE a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updates = {
    ...req.body,
    updatedAt: new Date()
  };

  try {
    const taskRef = doc(db, 'users', userId, 'tasks', id);
    await updateDoc(taskRef, updates);
    res.json({ id, ...updates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const taskRef = doc(db, 'users', userId, 'tasks', id);
    await deleteDoc(taskRef);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Additional routes for edit/delete could be added here  
module.exports = router;