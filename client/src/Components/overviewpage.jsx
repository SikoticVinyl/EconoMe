import React from 'react';
import { Link } from 'react-router-dom';
function OverviewPage() {
  // Replace these with your actual data
  const incomeTotal = 1000;
  const expensesTotal = 500;
  const savingsGoals = 200;
  const profit = incomeTotal - expensesTotal;
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
        <p>Income Total: {incomeTotal}</p>
        <p>Expenses Total: {expensesTotal}</p>
        <p>Savings Goals: {savingsGoals}</p>
        <p>Profit: {profit}</p>
      </div>
      <Link to="/update-Budget">Update Budget</Link>
    </div>
  );
}
export default OverviewPage;
























