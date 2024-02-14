import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
  return (
    <div className="bg-custom-background bg-cover min-h-screen flex flex-col items-center justify-center space-y-4 home-page-container" style={{ margin: 0, padding: 0 }}>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 home-page-content">
        <h1 className="mb-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold font-protest-riot font-old-standard-tt text-white home-page-title">
          EconoMe
        </h1>

        {/* Use the Link component to wrap the entire button */}
        <Link to="/login" className="w-full">
          <button className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105 home-page-button">
            Login
          </button>
        </Link>

        {/* Use the Link component to wrap the entire button */}
        <Link to="/signup" className="w-full">
          <button className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105 home-page-button">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;