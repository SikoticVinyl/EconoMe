import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_TOTAL_INCOME, GET_TOTAL_EXPENSES, GET_TOTAL_FLEXIBLE_EXPENSES } from '../client-graphql/queries/transactionQueries';
function OverviewPage() {
  // State for the static savings goal
  const [savingsGoal, setSavingsGoal] = useState('');

  // GraphQL queries
  const { data: incomeData, loading: incomeLoading } = useQuery(GET_TOTAL_INCOME);
  const { data: expensesData, loading: expensesLoading } = useQuery(GET_TOTAL_EXPENSES);
  const { data: flexibleExpensesData, loading: flexibleExpensesLoading } = useQuery(GET_TOTAL_FLEXIBLE_EXPENSES);

  // Check if data is loading
  if (incomeLoading || expensesLoading || flexibleExpensesLoading) return <p>Loading...</p>;

  return (
    <div
      className="flex flex-col h-screen justify-center items-center relative"
      style={{
        backgroundImage: `url(/Overviewpage1.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="mb-6 text-xl font-bold">Overview</h1>
        <p className="mb-4">Total Income: {incomeData.totalIncome}</p>
        <p className="mb-4">Total Expenses: {expensesData.totalExpenses}</p>
        <p className="mb-4">Total Flexible Expenses: {flexibleExpensesData.totalFlexibleExpenses}</p>
        <div className="mb-6">
          <label htmlFor="savingsGoal" className="block text-sm font-bold mb-2">Savings Goal:</label>
          <input
            type="number"
            id="savingsGoal"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your savings goal"
          />
        </div>
        {/* Placeholder for dropdown and category details - implement based on your specific needs */}
      </div>
    </div>
  );
}

export default OverviewPage;