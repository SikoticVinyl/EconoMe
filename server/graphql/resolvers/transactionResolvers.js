
const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Transaction = require('../../models/Transaction');
const Category = require('../../models/Category');

const transactionResolvers = {
  Query: {
    transaction: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
          throw new UserInputError('Transaction not found');
        }
        return transaction;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    transactions: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const transactions = await Transaction.find({ user: context.user.id });
        return transactions;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { name, amount, transactionType, dueDate, payDate, flexible, paid, categoryId }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
      
        // Ensure the category exists and belongs to the user
        const category = await Category.findById(categoryId);
        if (!category || category.user.toString() !== context.user.id) {
          throw new UserInputError('Category not found or access denied');
        }
      
        // Initialize a base transaction object
        const transactionData = {
          name,
          amount,
          transactionType,
          category: categoryId,
          // Default values for optional fields
          dueDate: null,
          payDate: null,
          flexible: false,
          paid: false,
        };
      
        // Conditionally add fields based on the transaction type
        if (transactionType === "TypeA") {
          transactionData.dueDate = dueDate;
          transactionData.flexible = flexible;
        } else if (transactionType === "TypeB") {
          transactionData.payDate = payDate;
          transactionData.paid = paid;
        }
      
        // Create the transaction with conditional fields
        const newTransaction = new Transaction(transactionData);
      
        try {
          await newTransaction.save();
          return newTransaction;
        } catch (error) {
          console.error('Error saving transaction:', error);
          throw new UserInputError(error.message);
        }
      },
      
    updateTransaction: async (_, { id, name, amount, dueDate, payDate, flexible, paid }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      const updateData = { name, amount, dueDate, payDate, flexible, paid };

      // Remove undefined fields
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTransaction) {
          throw new UserInputError('Transaction not found');
        }
        return updatedTransaction;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    moveTransaction: async (_, { transactionId, newCategoryId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      // Validate the new category
      const newCategory = await Category.findById(newCategoryId);
      if (!newCategory || newCategory.user.toString() !== context.user.id) {
        throw new UserInputError('New category not found or access denied');
      }

      try {
        const movedTransaction = await Transaction.findByIdAndUpdate(
          transactionId,
          { category: newCategoryId },
          { new: true }
        );
        if (!movedTransaction) {
          throw new UserInputError('Transaction not found');
        }
        return movedTransaction;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteTransaction: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
          throw new UserInputError('Transaction not found');
        }
        return deletedTransaction;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteMany: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
    
      try {
        // Use deleteMany to remove all transactions where the user field matches the logged-in user's id
        const result = await Transaction.deleteMany({ user: context.user.id });
    
        // Optional: Check if transactions were deleted and respond accordingly
        if (result.deletedCount === 0) {
          throw new UserInputError('No transactions found to delete');
        }
    
        // Return a message or boolean indicating success
        return true; // or return a message like "Transactions successfully deleted"
      } catch (error) {
        console.error('Error deleting user transactions:', error);
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = transactionResolvers;
