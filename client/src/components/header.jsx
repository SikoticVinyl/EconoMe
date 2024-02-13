import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<header>
			<div className="menu-icon" onClick={toggleMenu}>
				<div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
			</div>

			<nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
