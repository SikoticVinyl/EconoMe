import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UpdateBudget() {
  // Initialize state variables with your actual data
  const [incomeTotal, setIncomeTotal] = useState(1000);
  const [expensesTotal, setExpensesTotal] = useState(500);
  const [savingsGoals, setSavingsGoals] = useState(200);

  // Calculate profit on the fly based on the current state
  const profit = incomeTotal - expensesTotal;

  // Handlers to update state based on user input
  const handleIncomeChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== '') {
      setIncomeTotal(Number(newValue));
    }
  };

  const handleExpensesChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== '') {
      setExpensesTotal(Number(newValue));
    }
  };

  const handleSavingsGoalsChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== '') {
      setSavingsGoals(Number(newValue));
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => {/* handle navigation */}}>App Navigation</button>
        <button>
          <Link to="/profile">Profile</Link>
        </button>
      </div>
      <div>
        <h1>Overview</h1>
        <div>
          <label>Income Total: 
            <input type="number" value={incomeTotal} onChange={handleIncomeChange} placeholder="Income Total" />
          </label>
        </div>
        <div>
          <label>Expenses Total: 
            <input type="number" value={expensesTotal} onChange={handleExpensesChange} placeholder="Expenses Total" />
          </label>
        </div>
        <div>
          <label>Savings Goals: 
            <input type="number" value={savingsGoals} onChange={handleSavingsGoalsChange} placeholder="Savings Goals" />
          </label>
        </div>
        <p>Profit: {profit}</p>
      </div>
      <Link to="/update-income">Update Income</Link>
    </div>
  );
}

export default updateBudget;