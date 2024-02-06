const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const User = require('../../models/User');

const resolvers = {
  Mutation: {
    createUser: async (_, { fullName, username, email, password }) => {
      const newUser = new User({ fullName, username, email, password });

      try {
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        return { token, user: newUser };
      } catch (error) {
        if (error.code === 11000) {
          throw new UserInputError('Username or email already exists.');
        }
        throw new UserInputError(error.message);
      }
    },

    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid password');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return { token, user };
    },
  },
};

module.exports = resolvers;