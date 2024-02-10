import React from "react";
import { Link } from "react-router-dom";

function OverviewPage() {
  // Replace these with your actual data
  const incomeTotal = 1000;
  const expensesTotal = 500;
  const savingsGoals = 200;
  const profit = incomeTotal - expensesTotal;

  // Replace this with your actual profile image URL
  const profileImageUrl = "https://example.com/profile.jpg";

  return (
    <div className="flex flex-col h-screen justify-center items-center relative">
      <button
        className="absolute top-0 left-0 m-4 p-2 flex flex-col justify-around h-6 w-6"
        onClick={() => {
          /* handle navigation */
        }}
      >
        <span className="bg-black h-0.5 w-full"></span>
        <span className="bg-black h-0.5 w-full"></span>
        <span className="bg-black h-0.5 w-full"></span>
      </button>
      <Link to="/profile" className="absolute top-0 right-0 m-4">
        <img
          src="/Profileicon.jpg"
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
      </Link>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Overview</h1>
          <p className="text-xl">Income Total: {incomeTotal}</p>
          <p className="text-xl">Expenses Total: {expensesTotal}</p>
          <p className="text-xl">Savings Goals: {savingsGoals}</p>
          <p className="text-xl">Profit: {profit}</p>
        </div>
      </div>
      <div className="mt-auto mb-4">
        <Link
          className="p-2 bg-green-500 text-white rounded"
          to="/update-income"
        >
          Update Income
        </Link>
      </div>
    </div>
  );
}

export default OverviewPage;
