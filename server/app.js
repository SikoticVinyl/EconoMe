require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

app.use('/api/users', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

