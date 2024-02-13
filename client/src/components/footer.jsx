import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer>
			<Link to="/updateBudget" className="updateBudgetBtn">
				<button>Update Budget</button>
			</Link>
		</footer>
	);
};

export default Footer;
