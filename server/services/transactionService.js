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