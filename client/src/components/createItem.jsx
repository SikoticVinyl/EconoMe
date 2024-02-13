import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateItem = () => {
	const history = useHistory();
	const [itemName, setItemName] = useState('');
	const [dollarAmount, setDollarAmount] = useState('');
	const [type, setType] = useState('income');
	const [category, setCategory] = useState('rent');
	const [customCategory, setCustomCategory] = useState('');
	const [showCustomCategory, setShowCustomCategory] = useState(false);

	const handleTypeChange = newType => {
		setType(newType);
	};

	const handleCategoryChange = newCategory => {
		setCategory(newCategory);
	};

	const handleAddCategory = () => {
		setShowCustomCategory(true);
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Perform your submit logic here, e.g., API call or state update
		// After submission, you can redirect to another page
		history.push('/items'); // Redirect to the items page
	};

	return (
		<div>
			<h1>Create Item</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Item Name:
					<input
						type="text"
						value={itemName}
						onChange={e => setItemName(e.target.value)}
					/>
				</label>
				<br />

				<label>
					Dollar Amount:
					<input
						type="text"
						value={dollarAmount}
						onChange={e => setDollarAmount(e.target.value)}
					/>
				</label>
				<br />

				<label>
					Type:
					<div>
						<label>
							<input
								type="radio"
								value="income"
								checked={type === 'income'}
								onChange={() => handleTypeChange('income')}
							/>
							Income
						</label>
						<label>
							<input
								type="radio"
								value="expense"
								checked={type === 'expense'}
								onChange={() => handleTypeChange('expense')}
							/>
							Expense
						</label>
						<label>
							<input
								type="radio"
								value="saving"
								checked={type === 'saving'}
								onChange={() => handleTypeChange('saving')}
							/>
							Saving
						</label>
					</div>
				</label>
				<br />

				<label>
					Category:
					<select
						value={category}
						onChange={e => handleCategoryChange(e.target.value)}
					>
						<option value="rent">Rent</option>
						<option value="auto">Auto</option>
						<option value="food">Food</option>
						<option value="entertainment">Entertainment</option>
					</select>
					{showCustomCategory && (
						<div>
							<label>
								Custom Category:
								<input
									type="text"
									value={customCategory}
									onChange={e => setCustomCategory(e.target.value)}
								/>
							</label>
						</div>
					)}
					<button type="button" onClick={handleAddCategory}>
						Add Category
					</button>
				</label>
				<br />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default CreateItem;
