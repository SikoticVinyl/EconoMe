import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CREATE_BUDGET, } from '../client-graphql/mutations/budgetMutations';
import { CREATE_CATEGORY, } from '../client-graphql/mutations/transactionMutations';
import { CREATE_TRANSACTION, } from '../client-graphql/mutations/transactionMutations';

function CreateBudgetPage() {

    //Hooks for managing form input values
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [transaction, setTransaction] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  //Hooks for Graphql mutations 
  const [createBudget, { data: budgetData, loading: budgetLoading, error: budgetError }] = useMutation(CREATE_BUDGET);
  const [createCategory, { data: categoryData, loading: categoryLoading, error: categoryError }] = useMutation(CREATE_CATEGORY);
  const [createTransaction, { data: transactionData, loading: transactionLoading, error: transactionError }] = useMutation(CREATE_TRANSACTION);


  // State to control the display of sections
  const [step, setStep] = useState(1); // Start with step 1 (create budget)

  //To capture budgetID once created and server it to the backend without the user needing to know budget ID. 
  const [currentBudgetId, setCurrentBudgetId] = useState(null);

  // Function for budget creation
  const handleCreateBudget = () => {
    createBudget({
      variables: { name: budgetName },
    }).then(response => {
      const budgetId = response.data.createBudget.id;
      setCurrentBudgetId(budgetId); // Store the budget ID
      setStep(2); // Proceed to category creation
    }).catch(error => {
      console.error('Error creating budget:', error);
    });
  };
  //Adds state hook to track FlexB based on user input. 
  const [isFlexible, setIsFlexible] = useState(false);

  // Function to handle category creation
  const handleCreateCategory = () => {
  createCategory({
    variables: {
      name: categoryName,
      flexB: isFlexible,
      budgetId: currentBudgetId,
    },
  }).then(response => {
    console.log('Category created:', response.data.createCategory);
    setStep(3); // Proceed to transaction creation
  }).catch(error => {
    console.error('Error creating category:', error);
  });
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isFlexible}
              onChange={(e) => setIsFlexible(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Flexible</span>
          </label>
          <button onClick={handleCreateCategory} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Create Category</button>
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