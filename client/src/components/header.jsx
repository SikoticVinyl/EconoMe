import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="flex flex-col items-stretch bg-cover bg-center"
      style={{
        backgroundImage: `url(/Moneybg.jpg)`,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white
        backgroundBlendMode: 'overlay', // blend the background image with the color
      }}
    >
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      <nav className={`menu ${isMenuOpen ? 'open' : ''} flex justify-between`}>
        <ul>
          <li>
            <Link to="/">
              <div className="p-2 border-2 border-black rounded bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="relative">
            <button className="p-2 rounded bg-blue-500 hover:bg-blue-700">
              <Link to="/profile">
                <img className="w-10 h-10 absolute top-0 right-0 mt-[-5px] rounded-full" src="/Profileicon.jpg" alt="Profile" />
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
