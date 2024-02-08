const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Total Income
exports.getTotalIncome = async (userId) => {
  const result = await Transaction.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId), transactionType: 'income' } },
    { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
  ]);
  return result[0] ? result[0].totalIncome : 0;
};

// Total Expenses
exports.getTotalExpenses = async (userId) => {
  const result = await Transaction.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId), transactionType: 'expense' } },
    { $group: { _id: null, totalExpenses: { $sum: "$amount" } } }
  ]);
  return result[0] ? result[0].totalExpenses : 0;
};

// Total Savings
exports.getTotalSavings = async (userId) => {
  const result = await Transaction.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId), transactionType: 'savings' } },
    { $group: { _id: null, totalSavings: { $sum: "$amount" } } }
  ]);
  return result[0] ? result[0].totalSavings : 0;
};

// Total Flexible Expenses
exports.getTotalFlexibleExpenses = async (userId) => {
  const result = await Transaction.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId), transactionType: 'expense', flexible: true } },
    { $group: { _id: null, totalFlexible: { $sum: "$amount" } } }
  ]);
  return result[0] ? result[0].totalFlexible : 0;
};