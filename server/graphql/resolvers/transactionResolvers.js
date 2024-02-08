const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Transaction = require('../../models/Transaction');
const Category = require('../../models/Category');

const transactionResolvers = {
    Query: {
      transaction: async (_, { id }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        const transaction = await Transaction.findById(id);
        if (!transaction || transaction.user.toString() !== context.user._id.toString()) {
          throw new UserInputError('Transaction not found or access denied');
        }
        return transaction;
      },
      transactions: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        const transactions = await Transaction.find({ user: context.user._id });
        return transactions;
      },
    },
    Mutation: {
    createTransaction: async (_, { name, amount, transactionType, dueDate, payDate, flexible, categoryId }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
        // Ensure the category exists and belongs to the user
        const category = await Category.findById(categoryId);
        if (!category || category.user.toString() !== context.user.id) {
          throw new UserInputError('Category not found or access denied');
        }
        // Initialize a base transaction object with common fields
        const transactionData = {
          name,
          amount,
          transactionType,
          category: categoryId,
          user: context.user._id,
          paid: false,
        };
        // Adjust fields based on the transaction type
        if (transactionType === "expense") {
          transactionData.dueDate = dueDate;
          transactionData.flexible = flexible ?? false; // Use provided value or default to false
        } else if (transactionType === "income") {
          transactionData.payDate = payDate;
          // For income, 'flexible' is not applicable, and 'paid' defaults to false
        }
        // Create and save the transaction
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
  
        // First, ensure the transaction belongs to the user
        const transaction = await Transaction.findById(id);
        if (!transaction || transaction.user.toString() !== context.user._id.toString()) {
          throw new UserInputError('Transaction not found or access denied');
        }
  
        const updateData = { name, amount, flexible, paid };
        // Conditionally add fields based on the transaction type
        if (transaction.transactionType === "expense") {
          updateData.dueDate = dueDate;
        } else if (transaction.transactionType === "income") {
          updateData.payDate = payDate;
        }
  
        // Remove undefined fields
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
  
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true });
        return updatedTransaction;
      },
      moveTransaction: async (_, { transactionId, newCategoryId }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        const transaction = await Transaction.findById(transactionId);
        if (!transaction || transaction.user.toString() !== context.user._id.toString()) {
          throw new UserInputError('Transaction not found or access denied');
        }
  
        const newCategory = await Category.findById(newCategoryId);
        if (!newCategory || newCategory.user.toString() !== context.user._id.toString()) {
          throw new UserInputError('New category not found or access denied');
        }
  
        transaction.category = newCategoryId;
        await transaction.save();
        return transaction;
      },
      deleteTransaction: async (_, { id }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        const transaction = await Transaction.findById(id);
        if (!transaction || transaction.user.toString() !== context.user._id.toString()) {
          throw new UserInputError('Transaction not found or access denied');
        }
  
        await Transaction.findByIdAndDelete(id);
        return { id }; // Assuming you want to return the ID of the deleted transaction for confirmation
      },
    },
  };
  
  module.exports = transactionResolvers;
