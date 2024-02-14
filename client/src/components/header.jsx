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

// this is the profile icon that will be used in the header
{/* <Link to="/userprofilepage" className="absolute top-0 right-0 m-4 h-12 w-12">
<img
  src="/Profileicon.jpg"
  alt="Profile"
  className="h-full w-full rounded-full object-cover block"
/>
</Link> */}