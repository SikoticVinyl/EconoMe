const { Budget } = require('../models/Budget');
const { Category } = require('../models/Category');
const mongoose = require('mongoose');

// Helper function to fetch user's budget IDs
async function fetchUserBudgetIds(userId) {
  const budgets = await Budget.find({ user: new mongoose.Types.ObjectId(userId) }, '_id');
  return budgets.map(budget => budget._id);
}


// Generalized aggregation function for transactions
async function aggregateTransactions(userId, transactionType, flexible) {
    const budgetIds = await fetchUserBudgetIds(userId);
    const match = { 
        'transactions.transactionType': transactionType,
    };
    if (flexible !== undefined) {
        match['transactions.flexible'] = flexible;
    }

    const categories = await Category.aggregate([
        { $match: { budget: { $in: budgetIds } } },
        { $unwind: '$transactions' },
        { $match: match },
        { $group: { _id: null, total: { $sum: '$transactions.amount' } } },
    ]);

    return categories[0] ? categories[0].total : 0;
}

// Exported service functions
exports.getTotalIncome = async (userId) => aggregateTransactions(userId, 'income');
exports.getTotalExpenses = async (userId) => aggregateTransactions(userId, 'expense');
exports.getTotalSavings = async (userId) => aggregateTransactions(userId, 'savings');
exports.getTotalFlexibleExpenses = async (userId) => aggregateTransactions(userId, 'expense', true);
