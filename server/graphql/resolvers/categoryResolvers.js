const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Category = require('../../models/Category');
const Budget = require('../../models/Budget');
const Transaction = require('../../models/Transaction');

const categoryResolvers = {
    Query: {
      category: async (_, { id }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const category = await Category.findById(id);
          if (!category) {
            throw new UserInputError('Category not found');
          }
          return category;
        } catch (error) {
          throw new UserInputError(error.message);
        }
      },
      categories: async (_, __, context) => {
        if (!context.user) {
          throw new AuthenticationError('Authentication required');
        }
  
        try {
          const categories = await Category.find({ user: context.user.id });
          return categories;
        } catch (error) {
          throw new UserInputError(error.message);
        }
      },
    },
    Mutation: {
        createCategory: async (_, { name, flexB, budgetId }, context) => {
          if (!context.user) {
            throw new AuthenticationError('Authentication required');
          }
    
          // Ensure the budget exists and belongs to the user
          const budget = await Budget.findById(budgetId);
          if (!budget || budget.user.toString() !== context.user.id) {
            throw new UserInputError('Budget not found or access denied');
          }
    
          const newCategory = new Category({
            name,
            flexB,
            budget: budgetId,
          });
    
          try {
            await newCategory.save();
            return newCategory;
          } catch (error) {
            throw new UserInputError(error.message);
          }
        },
        updateCategory: async (_, { id, name, flexB }, context) => {
          if (!context.user) {
            throw new AuthenticationError('Authentication required');
          }
    
          const updateData = {};
          if (name !== undefined) updateData.name = name;
          if (flexB !== undefined) updateData.flexB = flexB;
    
          try {
            const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedCategory) {
              throw new UserInputError('Category not found');
            }
            return updatedCategory;
          } catch (error) {
            throw new UserInputError(error.message);
          }
        },
        deleteCategory: async (_, { id, deleteTransactions, deleteLinkedCategories }, context) => {
          if (!context.user) {
            throw new AuthenticationError('Authentication required');
          }
    
          // Additional logic to handle deletion of transactions and linked categories as needed
    
          try {
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
              throw new UserInputError('Category not found');
            }
            return deletedCategory;
          } catch (error) {
            throw new UserInputError(error.message);
          }
        },
        // Implement linkCategoryToBudget mutation as required by our application logic
      },
    };
    
    module.exports = categoryResolvers;
    
  