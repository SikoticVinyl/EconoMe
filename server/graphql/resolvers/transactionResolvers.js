const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Transaction = require('../../models/Transaction');
const { Category } = require('../../models/Category');
const transactionServices = require('../../services/transactionService');

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
      totalIncome: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
        return await transactionServices.getTotalIncome(context.user._id);
      },
      totalExpenses: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
        return await transactionServices.getTotalExpenses(context.user._id);
      },
      totalSavings: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
        return await transactionServices.getTotalSavings(context.user._id);
      },
      totalFlexibleExpenses: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
        return await transactionServices.getTotalFlexibleExpenses(context.user._id);
      }
    },
    Mutation: {
      createTransaction: async (_, { name, amount, transactionType, dueDate, payDate, flexible, categoryId }, context) => {
        if (!context.user) {
            throw new AuthenticationError('Authentication required');
        }

        // Initialize a base transaction object with common fields
        const transactionData = {
            name,
            amount,
            transactionType,
            user: context.user.id,
            paid: false
        };

        // Adjust fields based on the transaction type
        if (transactionType === "expense") {
            transactionData.dueDate = dueDate;
            transactionData.flexible = flexible ?? false;
        } else if (transactionType === "income") {
            transactionData.payDate = payDate;
        }

        try {
            // Find the category and update it with the new transaction
            const category = await Category.findById(categoryId);
            if (!category || (category.user && category.user.toString() !== context.user.id)) {
                throw new UserInputError('Category not found or access denied');
            }

            // Since transactions are embedded, we push the new transaction data directly
            category.transactions.push(transactionData);

            // Save the updated category
            await category.save();

            // MongoDB/Mongoose uses _id, but GraphQL expects an id field
            // Manually constructing the transaction object to include an id field
            const createdTransaction = category.transactions[category.transactions.length - 1];
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
            console.error('Error creating transaction:', error);
            throw new UserInputError('Failed to create transaction');
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
        return { id };
      },
    },
  };
  
  module.exports = transactionResolvers;