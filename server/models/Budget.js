const mongoose = require('mongoose');
const { schema: categorySchema } = require('./Category');

const budgetSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	categories: [categorySchema]
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = { Budget };
