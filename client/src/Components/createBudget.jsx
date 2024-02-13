import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CREATE_BUDGET, } from '../client-graphql/mutations/budgetMutations';
import { CREATE_CATEGORY, } from '../client-graphql/mutations/transactionMutations';
import { CREATE_TRANSACTION, } from '../client-graphql/mutations/transactionMutations';

function CreateBudgetPage() {
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [transaction, setTransaction] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  // State to control the display of sections
  const [step, setStep] = useState(1); // Start with step 1 (create budget)

  // Function to handle budget creation
  const handleCreateBudget = () => {
    // createBudget({ variables: { budget } });
    
    setStep(2); // Move to next step (create category) after budget is created
  };

  // Function to handle category creation
  const handleCreateCategory = () => {
    // Placeholder for mutation call to create category
    // createCategory({ variables: { category } });

    setStep(3); // Move to next step (add transaction) after category is created
  };

  // Function to handle transaction creation
  const handleCreateTransaction = () => {
    // Placeholder for mutation call to add transaction
    // createTransaction({ variables: { transaction, transactionAmount, category } });

    // Optional: Reset transaction fields or move to another step if needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover" style={{backgroundImage: `url(/budget-background.jpg)`}}>
      <div className="w-full max-w-xs">
        {step === 1 && (
          <div className="mb-4 bg-white rounded shadow-md px-8 pt-6 pb-8">
            <h2 className="mb-4 text-xl font-bold">Create a Budget</h2>
            <input
              type="number"
              placeholder="Set your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <button onClick={handleCreateBudget} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Budget</button>
          </div>
        )}

        {step === 2 && (
          <div className="mb-4 bg-white rounded shadow-md px-8 pt-6 pb-8">
            <h2 className="mb-4 text-xl font-bold">Create Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <button onClick={handleCreateCategory} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Category</button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded shadow-md px-8 pt-6 pb-8">
            <h2 className="mb-4 text-xl font-bold">Add Transaction</h2>
            <input
              type="text"
              placeholder="Transaction name"
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {/* Include category selection if multiple categories are allowed */}
            <button onClick={handleCreateTransaction} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Transaction</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBudgetPage;