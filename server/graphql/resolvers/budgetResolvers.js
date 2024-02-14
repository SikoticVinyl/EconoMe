const {
	UserInputError,
	AuthenticationError
} = require('apollo-server-express');

const { Budget } = require('../../models/Budget');

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
		}
	},
	Mutation: {
		createBudget: async (_, { name }, context) => {
			if (!context.user) {
			  console.log('Authentication required');
			  throw new AuthenticationError('Authentication required');
			}
		
			const newBudget = new Budget({
			  user: context.user.id,
			  name,
			});
		
			try {
			  const savedBudget = await newBudget.save();
			  console.log(`Budget created successfully: ${JSON.stringify(savedBudget)}`);
			  // Convert _id to string and ensure it is returned as `id` to match GraphQL expectations
			  return {
				...savedBudget.toObject(),
				id: savedBudget._id.toString(),
			  };
			} catch (error) {
			  console.error('Error creating budget:', error);
			  throw new UserInputError(error.message);
			}
		  },
		updateBudget: async (_, { id, name }, context) => {
			// Ensure the user is authenticated
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}

			try {
				const updatedBudget = await Budget.findByIdAndUpdate(
					id,
					{ name },
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
		}
	}
};

module.exports = budgetResolvers;
