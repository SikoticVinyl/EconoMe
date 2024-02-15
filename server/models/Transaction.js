const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name for the expense or income.']
	},
	amount: {
		type: Number,
		required: [true, 'Please provide an amount']
	},
	transactionType: {
		type: String,
		required: true,
		enum: ['Expense', 'Income'] // Restrict to these two values
	},
	dueDate: {
		type: Date,
		required: true,
		required: function () {
			return this.transactionType === 'Expense';
		} // Only required for expenses
	},
	payDate: {
		type: Date,
		required: true,
		required: function () {
			return this.transactionType === 'Income';
		} // Only required for income
	},
	flexible: {
		type: Boolean,
		required: function () {
			return this.transactionType === 'Expense';
		}
	},
	paid: {
		type: Boolean,
		default: false,
		required: function () {
			return this.transactionType === 'Expense';
		}
	}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports.Transaction = Transaction;
module.exports.schema = transactionSchema;
