const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const config = require('./config');

app.use(bodyParser.json());
app.use(express.static('client')); // Serve static files from client folder

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
