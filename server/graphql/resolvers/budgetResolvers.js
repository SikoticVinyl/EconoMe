const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Budget = require('../../models/Budget');

const budgetResolvers = {
  Query: {
    budget: async (_, { id }, context) => {
      // Ensure the user is authenticated, and implement logic to retrieve a budget by ID
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const budget = await Budget.findById(id);
        return budget;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    budgets: async (_, __, context) => {
      // Ensure the user is authenticated, and implement logic to retrieve all budgets
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const budgets = await Budget.find({ user: context.user.id });
        return budgets;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createBudget: async (_, { name, date }, context) => {
      // Ensure the user is authenticated, and implement logic to create a new budget
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const newBudget = new Budget({
        user: context.user.id,
        name,
        date,
      });

      try {
        await newBudget.save();
        return newBudget;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    updateBudget: async (_, { id, name, date }, context) => {
      // Ensure the user is authenticated, and implement logic to update an existing budget by ID
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const updatedBudget = await Budget.findByIdAndUpdate(
          id,
          { name, date },
          { new: true } // Return the updated budget
        );

        return updatedBudget;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteBudget: async (_, { id }, context) => {
      // Ensure the user is authenticated, and implement logic to delete a budget by ID
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const deletedBudget = await Budget.findByIdAndDelete(id);
        return deletedBudget;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = budgetResolvers;