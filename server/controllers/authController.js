const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    // Directly pass the plaintext password to User.create
    const newUser = await User.create({ fullName, username, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: { fullName, username, email }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }).select('+password');
  
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
          status: 'fail',
          message: 'Incorrect username or password'
        });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      // Remove password from output
      user.password = undefined;
  
      res.status(200).json({
        status: 'success',
        token,
        data: {
          user
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  