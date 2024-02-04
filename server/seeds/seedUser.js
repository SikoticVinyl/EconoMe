require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

console.log("Log of .env being pulled: ", process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Delete prior seeded data
//!!DEVELOPMENT ONLY!!
User.deleteMany({})
  .then(() => {
    console.log('Deleted all users');

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
