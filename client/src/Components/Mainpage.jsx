// MainPage.jsx
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import PropTypes from "prop-types";
import nightModeIcon from "../assets/nightmode-svgrepo-com.svg";

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
          <img
            src={nightModeIcon}
            alt="Toggle dark mode"
            style={{ height: "24px", width: "24px" }}
          />{" "}
          {/* use your SVG as the button's icon */}
        </button>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>EconoMe</h1>
      

      <Link to="/homepage">
        <button>Lets get started</button>
      </Link>

      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "2.5rem",
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} JuiceHeads
      </footer>
    </div>
  );
}

MainPage.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default MainPage;
