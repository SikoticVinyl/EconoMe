require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

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
