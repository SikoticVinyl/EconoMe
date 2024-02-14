const {
	UserInputError,
	AuthenticationError
} = require('apollo-server-express');
const { Budget } = require('../../models/Budget');
const { Transaction } = require('../../models/Transaction');
const { Category } = require('../../models/Category');
const transactionServices = require('../../services/transactionService');

const transactionResolvers = {
	Query: {
		// Fetch a single transaction by its ID requires searching through all categories
		transaction: async (_, { id }, context) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}

			// console.log(`Fetching transaction by ID: ${id} for user ID: ${context.user._id}`);

			let transactionFound = null;
			let categoryFound = null;

			const budgets = await Budget.find({ user: context.user._id });
			/* console.log(`Found ${budgets.length} budgets for the user.`); */

			for (let budget of budgets) {
				const categories = await Category.find({ budget: budget._id });
				// console.log(`Found ${categories.length} categories in budget ID: ${budget._id}`);

				//Search for the transaction in each category
				for (let category of categories) {
					const transaction = category.transactions.id(id);
					if (transaction) {
						console.log(`Transaction found in category: ${category.name}`);
						transactionFound = transaction;
						categoryFound = category;
						break;
					}
				}
				if (transactionFound) break;
			}
			if (!transactionFound) {
				//console.log("Transaction not found or access denied.");
				throw new UserInputError('Transaction not found or access denied');
			}
			return {
				...transactionFound.toObject(),
				id: transactionFound._id.toString(),
				category: {
					id: categoryFound._id.toString(),
					name: categoryFound.name
				}
			};
		},
		// Fetch all transactions for the user
		transactions: async (_, __, context) => {
			if (!context.user) {
				//console.log("Authentication Error: User is not authenticated.");
				throw new AuthenticationError('Authentication required');
			}
			//console.log(`Fetching budgets for user ID: ${context.user._id}`);
			// Fetch budgets for the user
			const budgets = await Budget.find({ user: context.user._id });
			//  console.log(`Found ${budgets.length} budgets for the user.`);
			if (budgets.length === 0) {
				console.log('No budgets found for this user.');
				return [];
			}
			let allTransactions = [];
			for (let budget of budgets) {
				//console.log(`Fetching categories for budget ID: ${budget._id}`);
				const categories = await Category.find({ budget: budget._id });
				//console.log(`Found ${categories.length} categories in budget ID: ${budget._id}`);
				for (let category of categories) {
					//console.log(`Processing ${category.transactions.length} transactions in category: ${category.name}`);
					let transactions = category.transactions.map(transaction => {
						const transactionObject = {
							...transaction.toObject(),
							id: transaction._id.toString(), // Conversion to string for GraphQL compatibility
							category: {
								id: category._id.toString(),
								name: category.name
							}
						};
						//console.log(`Transaction: ${transactionObject.id}, Amount: ${transactionObject.amount}`);
						return transactionObject;
					});

					allTransactions = allTransactions.concat(transactions);
				}
			}
			//console.log(`Total transactions found for user ${context.user._id}: ${allTransactions.length}`);
			return allTransactions;
		},
		totalIncome: async (_, __, context) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}
			return await transactionServices.getTotalIncome(context.user.id);
		},
		totalExpenses: async (_, __, context) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}
			return await transactionServices.getTotalExpenses(context.user._id);
		},
		// Future Feature
		//totalSavings: async (_, __, context) => {
		//  if (!context.user) {
		//    throw new AuthenticationError('Authentication required');
		//  }
		//  return await transactionServices.getTotalSavings(context.user._id);
		//},
		totalFlexibleExpenses: async (_, __, context) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}
			return await transactionServices.getTotalFlexibleExpenses(
				context.user._id
			);
		}
	},
	Mutation: {
		createTransaction: async (
			_,
			{ name, amount, transactionType, dueDate, payDate, flexible, categoryId },
			context
		  ) => {
			console.log("Starting createTransaction with input:", { name, amount, transactionType, dueDate, payDate, flexible, categoryId });
		
			if (!context.user) {
			  console.log("Authentication required error");
			  throw new AuthenticationError('Authentication required');
			}
		
			// Log the user ID for debugging
			console.log("Authenticated user ID:", context.user.id);
		
			// Initialize a base transaction object with common fields
			const transactionData = {
			  name,
			  amount,
			  transactionType,
			  user: context.user.id,
			  paid: false
			};
		
			console.log("Initial transaction data:", transactionData);
		
			// Adjust fields based on the transaction type
			if (transactionType === 'expense') {
			  transactionData.dueDate = dueDate;
			  transactionData.flexible = flexible ?? false;
			} else if (transactionType === 'income') {
			  transactionData.payDate = payDate;
			}
		
			console.log("Adjusted transaction data based on type:", transactionData);
		
			try {
			  // Find the category and update it with the new transaction
			  const category = await Category.findById(categoryId);
			  if (!category || (category.user && category.user.toString() !== context.user.id)) {
				console.log("Category not found or access denied. Category ID:", categoryId);
				throw new UserInputError('Category not found or access denied');
			  }
		
			  console.log("Category found:", { id: category._id, name: category.name });
		
			  // Since transactions are embedded, we push the new transaction data directly
			  category.transactions.push(transactionData);
		
			  // Log the category with the new transaction for debugging
			  console.log("Category after adding transaction:", category);
		
			  // Save the updated category
			  await category.save();
		
			  // MongoDB/Mongoose uses _id, but GraphQL expects an id field
			  const createdTransaction = category.transactions[category.transactions.length - 1];
			  
			  console.log("Created transaction:", createdTransaction);
		
			  return {
				id: createdTransaction._id.toString(), // Ensure conversion of _id to string
				name: createdTransaction.name,
				amount: createdTransaction.amount,
				transactionType: createdTransaction.transactionType,
				user: createdTransaction.user,
				paid: createdTransaction.paid,
				dueDate: createdTransaction.dueDate ? createdTransaction.dueDate.toISOString() : null,
				payDate: createdTransaction.payDate ? createdTransaction.payDate.toISOString() : null,
				flexible: createdTransaction.flexible,
				category: {
				  id: category._id.toString(),
				  name: category.name
				}
			  };
			} catch (error) {
			  console.error("Error creating transaction:", error);
			  throw new UserInputError('Failed to create transaction', { error });
			}
		  },
		updateTransaction: async (
			_,
			{ id, name, amount, dueDate, payDate, flexible, paid },
			context
		) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}

			let categoryFound = null;
			let transactionFound = null;

			// Find the category containing the transaction
			const budgets = await Budget.find({ user: context.user._id });
			for (let budget of budgets) {
				const categories = await Category.find({ budget: budget._id });
				for (let category of categories) {
					const transaction = category.transactions.id(id);
					if (transaction) {
						transactionFound = transaction;
						categoryFound = category;
						break;
					}
				}
				if (transactionFound) break;
			}

			if (!transactionFound) {
				throw new UserInputError('Transaction not found or access denied');
			}

			// Update the transaction
			transactionFound.name = name || transactionFound.name;
			transactionFound.amount = amount || transactionFound.amount;
			transactionFound.flexible =
				flexible !== undefined ? flexible : transactionFound.flexible;
			transactionFound.paid = paid !== undefined ? paid : transactionFound.paid;

			if (transactionFound.transactionType === 'expense') {
				transactionFound.dueDate = dueDate || transactionFound.dueDate;
			} else if (transactionFound.transactionType === 'income') {
				transactionFound.payDate = payDate || transactionFound.payDate;
			}

			// Save the updated category
			await categoryFound.save();

			return {
				...transactionFound.toObject(),
				id: transactionFound._id.toString(),
				category: {
					id: categoryFound._id.toString(),
					name: categoryFound.name
				}
			};
		},

		//Future Feature - Move Transaction

		// moveTransaction: async (_, { transactionId, newCategoryId }, context) => {
		//   if (!context.user) {
		//       throw new AuthenticationError('Authentication required');
		//   }

		//   try {
		// Find the budget first
		//       const budgets = await Budget.find({ user: context.user._id });

		//      for (let budget of budgets) {
		// Find the category within the budget
		//           const category = await Category.findOne({ _id: newCategoryId, budget: budget._id });

		//           if (category) {
		// Find the transaction within the category
		//              const transaction = category.transactions.id(transactionId);

		//                if (transaction) {
		// Remove the transaction from the current category
		//                  category.transactions.pull(transactionId);
		//                await category.save();

		// Update the category for the transaction
		//              transaction.category = newCategoryId;
		//             await transaction.save();

		//           return transaction;
		//     }
		// }
		//  }

		// If the transaction is not found or cannot be moved
		//  throw new UserInputError('Failed to move transaction');
		// } catch (error) {
		//   console.error('Error moving transaction:', error);
		//   throw new UserInputError('Failed to move transaction');
		// }
		//},

		deleteTransaction: async (_, { id }, context) => {
			if (!context.user) {
				throw new AuthenticationError('Authentication required');
			}
			let categoryFound = null;
			let transactionFound = null;
			// Find the category containing the transaction
			const budgets = await Budget.find({ user: context.user._id });
			for (let budget of budgets) {
				const categories = await Category.find({ budget: budget._id });
				for (let category of categories) {
					const transaction = category.transactions.id(id);
					if (transaction) {
						transactionFound = transaction;
						categoryFound = category;
						break;
					}
				}
				if (transactionFound) break;
			}
			if (!transactionFound) {
				throw new UserInputError('Transaction not found or access denied');
			}
			// Remove the transaction from the category
			categoryFound.transactions.pull(id);
			// Save the updated category
			await categoryFound.save();
			return { id: transactionFound._id }; // Return the deleted transaction ID
		}
	}
};

module.exports = transactionResolvers;
