const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userService');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send('Access denied.');

  try {
    const verified = jwt.verify(token, 'YOUR_SECRET_KEY'); // 
    const user = await findUserById(verified.id);

    if (!user) return res.status(401).send('User not found');

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
