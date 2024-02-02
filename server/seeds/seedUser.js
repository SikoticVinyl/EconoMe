require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/econome')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Development / example user
const seedUser = new User({
  fullName: 'Econo Me',
  username: 'devtest',
  email: 'test@example.com',
  password: 'Password123!'
});

seedUser.save()
  .then(user => {
    console.log('User created:', user);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating user:', err);
    mongoose.disconnect();
  });
