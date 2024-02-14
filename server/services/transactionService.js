const { Budget } = require('../models/Budget');
const { Category } = require('../models/Category');
const mongoose = require('mongoose');

// Helper function to fetch user's budget IDs
async function fetchUserBudgetIds(userId) {
	const budgets = await Budget.find(
		{ user: new mongoose.Types.ObjectId(userId) },
		'_id'
	);
	return budgets.map(budget => budget._id);
}

// Generalized aggregation function for transactions
async function aggregateTransactions(userId, transactionType, flexible) {
	const budgetIds = await fetchUserBudgetIds(userId);
	const match = {
		'transactions.transactionType': transactionType
	};
	if (flexible !== undefined) {
		match['transactions.flexible'] = flexible;
	}

	const categories = await Category.aggregate([
		{ $match: { budget: { $in: budgetIds } } },
		{ $unwind: '$transactions' },
		{ $match: match },
		{ $group: { _id: null, total: { $sum: '$transactions.amount' } } }
	]);

	return categories[0] ? categories[0].total : 0;
}

async function aggregateTransactionsByCategory(userId, transactionType) {
    // Ensure transactionType is capitalized to match your schema enum values
    const capitalizedTransactionType = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);

    const budgetIds = await fetchUserBudgetIds(userId);
    
    const aggregationPipeline = [
        {
            // Match categories that are in the user's budgets
            $match: { 
                budget: { $in: budgetIds } 
            }
        },
        {
            // Unwind the transactions array to process each transaction individually
            $unwind: '$transactions'
        },
        {
            // Further filter transactions by the specified type (Income or Expenses)
            $match: {
                'transactions.transactionType': capitalizedTransactionType
            }
        },
        {
            // Group by category ID and sum the amounts, also retaining the category name
            $group: {
                _id: '$_id',
                totalAmount: { $sum: '$transactions.amount' },
                name: { $first: '$name' }
            }
        },
        {
            // Project the desired output format
            $project: {
                _id: 0,
                categoryId: '$_id',
                name: 1,
                totalAmount: 1
            }
        }
    ];

    const categoriesWithTransactions = await Category.aggregate(aggregationPipeline);
    return categoriesWithTransactions;
}

// Exported service functions
exports.getTotalIncome = async userId =>
	aggregateTransactions(userId, 'income');
exports.getTotalExpenses = async userId =>
	aggregateTransactions(userId, 'expense');
exports.getTotalSavings = async userId =>
	aggregateTransactions(userId, 'savings');
exports.getTotalFlexibleExpenses = async userId =>
	aggregateTransactions(userId, 'expense', true);
exports.getTotalIncomeByCategory = async (userId) => {
		return aggregateTransactionsByCategory(userId, 'income');
	};
exports.getTotalExpensesByCategory = async (userId) => {
		return aggregateTransactionsByCategory(userId, 'expense');
	};