const { Budget } = require('../models/Budget');
const { Category } = require('../models/Category');
const mongoose = require('mongoose');

// Helper function to fetch user's budget IDs
async function fetchUserBudgetIds(userId) {
    const budgets = await Budget.find(
        { user: new mongoose.Types.ObjectId(userId) },
        '_id'
    );
    console.log('Fetched budget IDs:', budgets.map(budget => budget._id));
    return budgets.map(budget => budget._id);
}

// Generalized aggregation function for transactions
async function aggregateTransactions(userId, transactionType, flexible) {
    console.log('Aggregating transactions:', { userId, transactionType, flexible });
    const budgetIds = await fetchUserBudgetIds(userId);
    console.log('Budget IDs:', budgetIds);
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
    console.log('Aggregated categories:', categories);

    return categories[0] ? categories[0].total : 0;
}

async function aggregateTransactionsByCategory(userId, transactionType) {
    console.log('Aggregating transactions by category:', { userId, transactionType });
    
    const budgetIds = await fetchUserBudgetIds(userId);
    console.log('Budget IDs:', budgetIds);
    
    const aggregationPipeline = [
        {
            // Match categories that are in the user's budgets
            $match: { 
                budget: { $in: budgetIds } 
            }
        },
        {
            // Unwind the transactions array to access individual transactions
            $unwind: '$transactions'
        },
        {
            // Filter transactions by the specified transaction type
            $match: {
                'transactions.transactionType': transactionType
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
    console.log('Aggregation pipeline:', aggregationPipeline);

    const categoriesWithTransactions = await Category.aggregate(aggregationPipeline);
    console.log('Categories with transactions:', categoriesWithTransactions);

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
    console.log('Fetching total income by category for user:', userId);
    const categoriesWithTransactions = await aggregateTransactionsByCategory(userId, 'income');
    console.log('Total income by category:', categoriesWithTransactions);
    return categoriesWithTransactions;
};
exports.getTotalExpensesByCategory = async (userId) => {
    console.log('Fetching total expenses by category for user:', userId);
    const categoriesWithTransactions = await aggregateTransactionsByCategory(userId, 'expense');
    console.log('Total expenses by category:', categoriesWithTransactions);
    return categoriesWithTransactions;
};
