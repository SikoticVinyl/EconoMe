import React from 'react';
import { Link } from 'react-router-dom';

function userSettings() {
	// Replace these with your actual data

	return (
		<div>
			<div>
				<h1> Settings </h1>
			</div>
			<Link to="/userProfilepage">Back Profile </Link>
		</div>
	);
}
export default userSettings;
