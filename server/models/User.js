const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name']
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    lowercase: true,
    minlength: [5, 'Username must be at least 5 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email address'],
    validate: {
        validator: function(email) {
          if (!this.isModified('email')) {
            return true; // Skips validation if the email hasn't been modified/created
          }
          return new Promise((resolve, reject) => {
            this.constructor.findOne({ email: email.toLowerCase() }).then(user => {
              resolve(!user); // If user is found, resolve with false, otherwise true
            }).catch(err => reject(err));
          });
        },
        message: 'Email already exists'
      }
    },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    validate: {
      validator: function(v) {
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(v);
      },
      message: `Not a strong password! Ensure it has a minimum of 6 characters, includes a number, a lowercase letter, an uppercase letter, and a special character.`
    },
    select: false // Prevents password from being returned in queries by default
  }
});

// Pre-save hook to hash password before saving the user
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified/created
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
  
// Instance method to check user provided password against hashed password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;