const express = require('express');  
const router = express.Router();  
const jwt = require('jsonwebtoken')
const { auth } = require('../../firebase'); 

const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // creating JWT
        const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created!', token, uid: user.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {  
    const { email, password } = req.body;  

    try {  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);  
       const user = userCredential.user;
        
       const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Logged in successfully', token, uid: user.uid  });  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
});  

module.exports = router;