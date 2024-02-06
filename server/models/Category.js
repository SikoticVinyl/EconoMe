const mongoose = require('mongoose');
const { schema: transactionSchema } = require('./Transaction');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the category'],
  },
  flexB: {
    type: Boolean,
    required: [true, 'Please specify if the category is for flexible budgeting'],
  },
  linked: {
    type: Boolean,
    default: false,
  },
  transactions: [transactionSchema],
  filter: {
    type: String,
    enum: ['Income', 'Expenses', 'Savings'],
    required: [true, 'Please specify the category filter'],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports.Category = Category;
module.exports.schema = categorySchema;