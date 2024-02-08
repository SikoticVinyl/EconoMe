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