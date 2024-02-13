import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OverviewPage() {
	const [userNum, setUserNum] = useState(0);
	// Replace these with your actual data
	const incomeTotal = 1000;
	const expensesTotal = 500;
	const savingsGoals = 200;
	const profit = incomeTotal - expensesTotal;

	return (
		<div
			className="flex flex-col h-screen justify-center items-center relative"
			style={{
				backgroundImage: `url(/Overviewpage1.jpg)`,
				backgroundSize: 'cover'
			}}
		>
			<Link
				to="/your-desired-path"
				className="absolute top-0 left-0 m-4 h-12 w-12 flex flex-col justify-center items-center border-2 border-black shadow-md border-dashed rounded bg-gradient-to-r from-green-200 to-green-400 px-1"
			>
				<span className="bg-black h-0.5 w-full border border-black border-dashed"></span>
				<span className="bg-black h-0.5 w-full my-1 border border-black border-dashed"></span>
				<span className="bg-black h-0.5 w-full border border-black border-dashed"></span>
			</Link>
			<Link to="/profile" className="absolute top-0 right-0 m-4 h-12 w-12">
				<img
					src="/Profileicon.jpg"
					alt="Profile"
					className="h-full w-full rounded-full object-cover block"
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
			<div className="mb-20">
				<Link
					className="p-4 text-2xl bg-green-500 text-white rounded"
					to="/update-income"
				>
					Update Income
				</Link>
			</div>
		</div>
	);
}

export default OverviewPage;
