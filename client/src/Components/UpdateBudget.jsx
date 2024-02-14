import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
	GET_TOTAL_INCOME,
	GET_TOTAL_EXPENSES,
	GET_TOTAL_FLEXIBLE_EXPENSES,
	GET_TRANSACTIONS
} from '../client-graphql/queries/transactionQueries';

function UpdateBudget() {
	// State for the static savings goal
	const [newSavingsGoal, setNewSavingsGoal] = useState('');
	const [submittedSavingsGoal, setSubmittedSavingsGoal] = useState('');

	// GraphQL queries
	const {
		data: incomeData,
		loading: incomeLoading,
		error: incomeError
	} = useQuery(GET_TOTAL_INCOME);
	const {
		data: expensesData,
		loading: expensesLoading,
		error: expensesError
	} = useQuery(GET_TOTAL_EXPENSES);
	const {
		data: flexibleExpensesData,
		loading: flexibleExpensesLoading,
		error: flexibleExpensesError
	} = useQuery(GET_TOTAL_FLEXIBLE_EXPENSES);
	const {
		data: transactionsData,
		loading: transactionsLoading,
		error: transactionsError
	} = useQuery(GET_TRANSACTIONS);

	const handleSubmit = e => {
		e.preventDefault();
		// Update the submittedSavingsGoal state with the newSavingsGoal value
		setSubmittedSavingsGoal(newSavingsGoal);
	};

	// Check if data is loading
	if (
		incomeLoading ||
		expensesLoading ||
		flexibleExpensesLoading ||
		transactionsLoading
	) {
		return <p>Loading...</p>;
	}

	// Extract total income, expenses, flexible expenses
	const totalIncome = incomeData?.totalIncome || 0;
	const totalExpenses = expensesData?.totalExpenses || 0;
	const totalFlexibleExpenses = flexibleExpensesData?.totalFlexibleExpenses || 0;

	// Extract transactions
	const transactions = transactionsData?.transactions || [];

	// Filter transactions by income, expenses, flexible expenses
	const incomeTransactions = transactions.filter(
		transaction => transaction.transactionType === 'INCOME'
	);
	const expenseTransactions = transactions.filter(
		transaction => transaction.transactionType === 'EXPENSE'
	);
	const flexibleExpenseTransactions = transactions.filter(
		transaction => transaction.transactionType === 'FLEXIBLE_EXPENSE'
	);

	return (
		<div className="flex flex-col h-screen justify-center items-center relative">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h1 className="mb-6 text-4xl font-bold font-rubik-doodle">Overview</h1>
				{/* Total Income section */}
				<div className="mb-4">
					<div className="flex items-center justify-between cursor-pointer">
						<span className="text-lg font-bold ml-2">
							Total Income:
						</span>
						<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
							{totalIncome}
						</span>
					</div>
					{/* Render income transactions */}
					{incomeTransactions.map((transaction, index) => (
						<div key={index} className="flex items-center justify-between cursor-pointer">
							<span className="text-lg ml-2 pl-2">
								{transaction.name}:
							</span>
							<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
								{transaction.amount}
							</span>
						</div>
					))}
				</div>
				{/* Total Expenses section */}
				<div className="mb-4">
					<div className="flex items-center justify-between cursor-pointer">
						<span className="text-lg font-bold ml-2">
							Total Expense:
						</span>
						<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
							{totalExpenses}
						</span>
					</div>
					{/* Render expense transactions */}
					{expenseTransactions.map((transaction, index) => (
						<div key={index} className="flex items-center justify-between cursor-pointer">
							<span className="text-lg ml-2 pl-2">
								{transaction.name}:
							</span>
							<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
								{transaction.amount}
							</span>
						</div>
					))}
				</div>
				{/* Total Flexible Expenses section */}
				<div className="mb-4">
					<div className="flex items-center justify-between cursor-pointer">
						<span className="text-lg font-bold ml-2">
							Total Flexible Expenses:
						</span>
						<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
							{totalFlexibleExpenses}
						</span>
					</div>
					{/* Render flexible expense transactions */}
					{flexibleExpenseTransactions.map((transaction, index) => (
						<div key={index} className="flex items-center justify-between cursor-pointer">
							<span className="text-lg ml-2 pl-2">
								{transaction.name}:
							</span>
							<span className="text-right px-2 rounded text-lg font-bold ml-2 w-20">
								{transaction.amount}
							</span>
						</div>
					))}
				</div>
				{/* Savings Goal form */}
				<div className="mb-6">
					<label htmlFor="savingsGoal" className="block text-lg font-bold mb-2">
						Savings Goal: {submittedSavingsGoal}
					</label>
					<form onSubmit={handleSubmit} className="flex">
						<input
							type="number"
							id="savingsGoal"
							value={newSavingsGoal}
							onChange={e => setNewSavingsGoal(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
							placeholder="Enter your new savings goal"
						/>
						<button
							type="submit"
							className="px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105 w-1/2"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default UpdateBudget;

