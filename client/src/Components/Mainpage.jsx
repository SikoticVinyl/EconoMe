// MainPage.jsx
import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";
import "../index.css";
import nightModeIcon from "../assets/nightmode-svgrepo-com.svg";

function MainPage({}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-gray-900">
      <div className="fixed top-0 right-0 m-4">
        <button
          onClick={(e) => {
            toggleDarkMode();
            e.currentTarget.blur();
          }}
          className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none"
        >
          <img src={nightModeIcon} alt="Toggle dark mode" className="w-6 h-6" />{" "}
          {/* use your SVG as the button's icon */}
        </button>
      </div>
      <div className="mb-4">
        <a href="" alt="Logo" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-32 h-32 hover:animate-spin" alt="Vite logo" />
        </a>
      </div>
      <h1 className="mb-4 text-4xl font-bold font-rubik-doodle animate-bounce animate-slowping text-color4">
        EconoMe
      </h1>
      <svg
        className="animate-bounce w-6 h-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 16a.714.714 0 01-.504-.21l-5.25-5.517a.714.714 0 111.008-1.007L10 14.293l4.746-4.927a.714.714 0 111.008 1.007l-5.25 5.517A.714.714 0 0110 16z"
          clipRule="evenodd"
        />
      </svg>
      <Link to="/homepage" className="mb-4">
        <button className="px-4 py-2 bg- text-white rounded shadow-lg hover:bg-color2 active:scale-90 transform transition duration-150 ease-in-out cursor-pointer">
          Lets get started
        </button>
      </Link>
      <div className="mb-4">
        {/* ... other elements ... */}
        <Link to="/overviewpage" className="text-blue-500 hover:underline">
          Go to Overview Page
        </Link>
      </div>
      <footer className="absolute bottom-0 w-full h-16 text-sm text-center bg-gray-200 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 ">
        &copy; {new Date().getFullYear()} EconoMe
      </footer>
    </div>
  );
}

export default MainPage;
