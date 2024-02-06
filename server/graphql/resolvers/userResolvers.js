const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const User = require('../../models/User');
const Budget = require('../../models/Budget');
const Category = require('../../models/Category');
const Transaction = require('../../models/Transaction');

const resolvers = {
  Mutation: {
    createUser: async (_, { fullName, username, email, password }) => {
      console.log('Creating user:', { fullName, username, email, password });

      const newUser = new User({ fullName, username, email, password });

      try {
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        console.log('User created:', newUser);

        return { token, user: newUser };
      } catch (error) {
        if (error.code === 11000) {
          throw new UserInputError('Username or email already exists.');
        }

        console.error('Error creating user:', error);

        throw new UserInputError(error.message);
      }
    },

    loginUser: async (_, { username, password }) => {
      console.log('Logging in user:', { username, password });

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

      console.log('User logged in:', user);

      return { token, user };
    },

    updateUser: async (_, args, context) => {
      console.log('Updating user:', args);

      if (!context.userId) throw new AuthenticationError('You must be logged in');

      const { id, fullName, username, email, password } = args;
      const updates = {};

      if (context.userId !== id) throw new AuthenticationError('Unauthorized');

      if (fullName) updates.fullName = fullName;
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        updates.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

      console.log('User updated:', updatedUser);

      return updatedUser;
    },

    deleteUser: async (_, { id, confirm }, context) => {
      console.log('Deleting user:', { id, confirm });

      // Check for user confirmation
      if (!confirm) {
        throw new UserInputError('Deletion must be confirmed');
      }

      if (!context.user || context.user.id !== id) {
        throw new AuthenticationError('Unauthorized or not logged in');
      }

      try {
        // Deleting all associated Transactions.
        await Transaction.deleteMany({ user: id });

        // Delete all Categories associated with the user's Budgets.
        const budgets = await Budget.find({ user: id });
        const budgetIds = budgets.map((budget) => budget._id);
        await Category.deleteMany({ budget: { $in: budgetIds } });

        // Delete all Budgets owned by the user
        await Budget.deleteMany({ user: id });

        // Delete the User
        const result = await User.findByIdAndDelete(id);

        console.log(`User ${id} and all associated data have been deleted.`);

        return true;
      } catch (error) {
        console.error('Error deleting user:', error);

        // Handle errors, should set up for permission issues or user not found.
        throw error;
      }
    },
  },
};

module.exports = resolvers;