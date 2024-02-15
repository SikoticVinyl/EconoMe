import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { CREATE_BUDGET } from '../client-graphql/mutations/budgetMutations';
import { CREATE_CATEGORY } from '../client-graphql/mutations/categoriesMutations';
import { CREATE_TRANSACTION } from '../client-graphql/mutations/transactionMutations';

function CreateBudget() {
	const navigate = useNavigate();

	// State hooks for managing form input values
	const [budgetName, setBudgetName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [isFlexible, setIsFlexible] = useState(false);
	const [transactionName, setTransactionName] = useState('');
	const [transactionAmount, setTransactionAmount] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('');
	const [transactionType, setTransactionType] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [payDate, setPayDate] = useState('');
	const [isPaid, setIsPaid] = useState(false);

	// State hooks for application flow
	const [currentBudgetId, setCurrentBudgetId] = useState(null);
	const [createdCategories, setCreatedCategories] = useState([]);
	const [showCreateAnotherCategory, setShowCreateAnotherCategory] =
		useState(false);
	const [showTransactionConfirmation, setShowTransactionConfirmation] =
		useState(false);
	const [step, setStep] = useState(1);

	// Mutation hooks
	const [createBudget] = useMutation(CREATE_BUDGET, {
		onCompleted: data => {
			console.log('Budget creation response:', data);
			const budgetId = data.createBudget.id; // Ensure this matches the actual response structure
			console.log('Created budget ID:', budgetId);
			setCurrentBudgetId(budgetId);
			localStorage.setItem('currentBudgetId', budgetId);
			setStep(2); // Move to the next step or perform other actions as needed
		},
		onError: error => {
			console.error('Error creating budget:', error);
		}
	});
	const [createCategory] = useMutation(CREATE_CATEGORY);
	const [createTransaction] = useMutation(CREATE_TRANSACTION);

	// Function for budget creation
	const handleCreateBudget = () => {
		console.log('Attempting to create budget with name: ', budgetName);

		createBudget({ variables: { name: budgetName } })
			.then(response => {
				console.log(
					'Budget created successfully: ',
					response.data.createBudget
				);

				const budgetId = response.data.createBudget.id;
				setCurrentBudgetId(budgetId);
				setStep(2); // Proceed to category creation
			})
			.catch(error => {
				console.error('Error creating budget:', error);
				console.log('Variables sent on error: ', { name: budgetName });
			});
	};

	// Function to handle category creation
	const handleCreateCategory = () => {
		createCategory({
			variables: {
				name: categoryName,
				flexB: isFlexible,
				budgetId: currentBudgetId
			}
		})
			.then(response => {
				const newCategory = response.data.createCategory;
				setCreatedCategories(prev => [
					...prev,
					{ id: newCategory.id, name: newCategory.name }
				]);
				setShowCreateAnotherCategory(true); // Show prompt for creating another category
			})
			.catch(error => console.error('Error creating category:', error));
	};

	const handleUserDecision = createAnother => {
		setShowCreateAnotherCategory(false); // If yes, reset fields for a new category creation
		if (createAnother) {
			setCategoryName('');
			setIsFlexible(false);
		} else {
			setStep(3); //If no, Move to transaction creation step
		}
	};

	// Function to handle transaction creation
	const handleCreateTransaction = () => {
		createTransaction({
			variables: {
				name: transactionName,
				amount: parseFloat(transactionAmount),
				transactionType,
				dueDate: transactionType === 'expense' ? dueDate : null,
				payDate: transactionType === 'income' ? payDate : null,
				flexible: transactionType === 'expense' ? isFlexible : null,
				paid: transactionType === 'expense' ? isPaid : null,
				categoryId: selectedCategoryId
			}
		})
			.then(result => {
				// Handle success, maybe show a confirmation message
				setShowTransactionConfirmation(true);
			})
			.catch(error => console.error('Error adding transaction:', error));
	};
	const handleTransactionDecision = createAnother => {
		if (createAnother) {
			resetTransactionForm();
		} else {
			navigate('/overview-page');
		}
	};

	const resetTransactionForm = () => {
		setTransactionName('');
		setTransactionAmount('');
		setTransactionType('');
		setDueDate('');
		setPayDate('');
		setIsFlexible(false);
		setSelectedCategoryId('');
		setShowTransactionConfirmation(false);
	};

	return (
		<div
			className="flex flex-col items-center justify-center h-screen bg-cover"
			style={{ backgroundImage: `url(/Createbudget.jpg)` }}
		>
			<div className="w-full max-w-xs">
				{/* Budget Creation Step */}
				{step === 1 && (
					<div className="mb-4 bg-white rounded shadow-md px-8 pt-6 pb-8">
						<h2 className="mb-4 text-2xl font-bold font-rubik-doodle animate-bounce">
							Create a Budget
						</h2>
						<input
							type="text"
							placeholder={budgetName ? '' : 'Name your Budget'}
							value={budgetName}
							onChange={e => setBudgetName(e.target.value)}
							onFocus={e => (e.target.placeholder = '')}
							onBlur={e => (e.target.placeholder = 'Name your Budget')}
							className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						/>
						<div className="relative">
							<div className="absolute top-0 right-0 flex items-center justify-center animate-ping z-10">
								<div className="h-3 w-3 rounded-full bg-red-600 opacity-75"></div>
							</div>
							<button
								onClick={handleCreateBudget}
								className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105 relative z-0"
							>
								Create Budget
							</button>
						</div>
					</div>
				)}

				{/* Category Creation Step */}
				{step === 2 && (
					<div className="w-full max-w-xs">
						<div className="mb-4 bg-white rounded shadow-md px-8 pt-6 pb-8">
							<h2 className="mb-4 text-2xl font-bold font-rubik-doodle ">
								Create Category
							</h2>
							<input
								type="text"
								placeholder={categoryName ? '' : 'Category name'}
								value={categoryName}
								onChange={e => setCategoryName(e.target.value)}
								onFocus={e => (e.target.placeholder = '')}
								onBlur={e => (e.target.placeholder = 'Category name')}
								className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							/>
							<label className="inline-flex items-start">
								<input
									type="checkbox"
									checked={isFlexible}
									onChange={e => setIsFlexible(e.target.checked)}
									className="form-checkbox h-5 w-5 text-blue-600 mt-1"
								/>
								<div className="ml-2">
									<span className="text-gray-700">Flexible</span>
									<span className="text-xs text-gray-500 block font-bold">
										"Groceries, Subscriptions, Shopping, etc"
									</span>
								</div>
							</label>
							<div className="relative">
								<div className="absolute top-0 right-0 flex items-center justify-center ">
									<div className="h-3 w-3 rounded-full bg-red-600 opacity-75"></div>
								</div>
								<button
									onClick={handleCreateCategory}
									className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105 relative z-0"
								>
									Create Category
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Transaction Creation Step */}
				{step === 3 && (
					<div className="bg-white rounded shadow-md px-8 pt-6 pb-8 ">
						<h2 className="mb-4 text-3xl font-bold font-rubik-doodle">
							Add Transaction
						</h2>
						<input
							type="text"
							placeholder="Transaction Name"
							value={transactionName}
							onChange={e => setTransactionName(e.target.value)}
							className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						/>
						<select
							onChange={e => setTransactionType(e.target.value)}
							className="w-full mb-3 px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="">Select Transaction Type</option>
							<option value="Income">Income</option>
							<option value="Expense">Expense</option>
						</select>

						{/* Shared input for transaction amount */}
						<input
							type="number"
							placeholder="Amount"
							value={transactionAmount}
							onChange={e => setTransactionAmount(e.target.value)}
							className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						/>

						{transactionType === 'Income' && (
							<div>
								<p className="text-sm text-gray-500 font-bold">
									When is Payday?
								</p>
								<input
									type="date"
									placeholder="Pay Date"
									value={payDate}
									onChange={e => setPayDate(e.target.value)}
									className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								/>
							</div>
						)}
						{transactionType === 'Expense' && (
							<>
								<div>
									<p className="text-sm text-gray-500 font-bold">
										Due date of the Transaction.
									</p>
									<input
										type="date"
										placeholder="Due Date"
										value={dueDate}
										onChange={e => setDueDate(e.target.value)}
										className="w-full mb-3 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="flex items-center mb-3">
									<input
										type="checkbox"
										checked={isFlexible}
										onChange={e => setIsFlexible(e.target.checked)}
										className="form-checkbox h-5 w-5 text-blue-600"
									/>
									<span className="ml-2 text-gray-700">Flexible</span>
								</div>
							</>
						)}

						{/* Category Selection Dropdown */}
						<select
							value={selectedCategoryId}
							onChange={e => setSelectedCategoryId(e.target.value)}
							className="w-full mb-3 px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="">Select Category</option>
							{createdCategories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>

						<button
							onClick={handleCreateTransaction}
							className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105 relative z-0"
						>
							Add Transaction
						</button>
					</div>
				)}

				{/* Prompt for creating another category */}
				{showCreateAnotherCategory && (
					<div className="text-center">
						<div
							className="inline-block p-4 mb-4 rounded shadow-md"
							style={{ backgroundImage: `url(/alpopupcard.jpg)` }}
						>
							<p className="text-white">
								Category created successfully. Do you want to create another?
							</p>
						</div>
						<button
							onClick={() => handleUserDecision(true)}
							className="px-4 py-2 mr-2 text-white font-bold rounded bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105"
						>
							Yes
						</button>
						<button
							onClick={() => handleUserDecision(false)}
							className="px-4 py-2 text-white font-bold rounded bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105"
						>
							No
						</button>
					</div>
				)}

				{/* Prompt for creating another transaction or finishing */}
				{showTransactionConfirmation && (
					<div className="text-center">
						<div
							className="inline-block p-4 mb-4 rounded shadow-md"
							style={{ backgroundImage: `url(/alpopupcard.jpg)` }}
						>
							<p className="text-white">
								Transaction added successfully. Would you like to add another
								transaction?
							</p>
						</div>
						<button
							onClick={() => handleTransactionDecision(true)}
							className="px-4 py-2 mr-2 text-white font-bold rounded bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105"
						>
							Yes, add another
						</button>
						<button
							onClick={() => handleTransactionDecision(false)}
							className="px-4 py-2 text-white font-bold rounded bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-300 ease-in-out hover:scale-105"
						>
							No, I'm done
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default CreateBudget;
//adding comment so file name change goes through.
