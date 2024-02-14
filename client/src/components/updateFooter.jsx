import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
	GET_TOTAL_INCOME,
	GET_TOTAL_EXPENSES,
	GET_TOTAL_FLEXIBLE_EXPENSES,
	GET_TRANSACTIONS
} from '../client-graphql/queries/transactionQueries';

const UpdateFooter = () => {

	const handleCancel = () => {
		// Navigate to "overview.js" or any other route you desire
	};

	const handleAddItem = () => {
		// Navigate to "createItem.js" or any other route you desire
	};

	const handleSave = () => {
		// Navigate to "overview.js" or any other route you desire after saving
		// Implement your logic for saving the changes
		console.log('Save logic goes here');
	};

	return (
		<div className="update-footer max-w-100 flex justify-between">
    <Link to="/overview-page" className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
        <span className="text-2xl">Cancel</span>
    </Link>
    <Link to="/update-budget" className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
        <span className="text-2xl">Add Item</span>
    </Link>
    <Link to="/update-budget" className="flex-1 px-5 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition rounded">
        <span className="text-2xl">Save</span>
    </Link>
</div>
	);
};

export default UpdateFooter;
