import React, { useState } from 'react';
import { Link } from "react-router-dom";

function OverviewPage() {
  const [incomeTotal, setIncomeTotal] = useState(1000);
  const [expensesTotal, setExpensesTotal] = useState(500);
  const [savingsGoals, setSavingsGoals] = useState(200);
  const profit = incomeTotal - expensesTotal;

  const handleIncomeChange = (e) => setIncomeTotal(e.target.value);
  const handleExpensesChange = (e) => setExpensesTotal(e.target.value);
  const handleSavingsGoalsChange = (e) => setSavingsGoals(e.target.value);
  return (
    <div
      className="flex flex-col h-screen justify-center items-center relative"
      style={{
        backgroundImage: `url(/Overviewpage1.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen bg-cover" style={{backgroundImage: `url(/Overviewpage1.jpg)`}}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="mb-4 text-xl font-bold">Overview</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Income Total:</label>
            <input type="number" value={incomeTotal} onChange={handleIncomeChange} placeholder="Income Total" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Expenses Total:</label>
            <input type="number" value={expensesTotal} onChange={handleExpensesChange} placeholder="Expenses Total" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Savings Goals:</label>
            <input type="number" value={savingsGoals} onChange={handleSavingsGoalsChange} placeholder="Savings Goals" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <p className="text-gray-700 text-base">Profit: {profit}</p>
        </div>
        <Link to="/update-income" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Update Income</Link>
      </div>
      <div className="mb-20">
        <Link
          className="p-4 text-2xl bg-green-500 text-white rounded"
          to="/updateBudget"
        >
          Update Budget
        </Link>
      </div>
    </div>
  );
}

export default OverviewPage;
