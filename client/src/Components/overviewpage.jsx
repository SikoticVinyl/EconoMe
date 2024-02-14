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
        backgroundImage: `url(/Moneybg.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ backgroundImage: `url(/Wood.jpg)`, backgroundSize: "cover" }}>
        <h1 className="mb-6 text-5xl font-bold font-rubik-doodle text-center">Overview</h1>
        <div className="mb-6 flex justify-between items-center space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-2 w-1/3">Income Total:</label>
          <input type="number" value={incomeTotal} onChange={handleIncomeChange} placeholder="Income Total" className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 flex justify-between items-center space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-2 w-1/3">Expenses Total:</label>
          <input type="number" value={expensesTotal} onChange={handleExpensesChange} placeholder="Expenses Total" className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 flex justify-between items-center space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-2 w-1/3">Savings Goals:</label>
          <input type="number" value={savingsGoals} onChange={handleSavingsGoalsChange} placeholder="Savings Goals" className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <p className="mb-6 text-gray-700 text-2xl font-bold bg-green-200 text-green-700 p-3 rounded-md shadow-lg rubik-doodle text-center">Profit $: {profit}</p>
      </div>
      <Link to="/update-income" className="mb-6 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Update Income</Link>
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
