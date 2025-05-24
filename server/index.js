const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

import cors from 'cors';
app.user(cors());

const userRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const config = require('./config');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client')); // Serve static files from client folder

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
