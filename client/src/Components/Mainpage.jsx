// MainPage.jsx
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import PropTypes from 'prop-types';

function MainPage({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <div className="fixed top-0 right-0 m-4">
        <button
          onClick={(e) => {
            toggleDarkMode();
            e.currentTarget.blur();
          }}
          className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {/* Replace with your icon's SVG path */}
          </svg>
        </button>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Pennywise</h1>
      <Link to="/homepage">
        <button>Lets get started</button>
      </Link>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

MainPage.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default MainPage;
