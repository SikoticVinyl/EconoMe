import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ backgroundImage: `url(/HomepageBG.jpg)`, backgroundSize: 'cover' }} className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 bg-white bg-opacity-70 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded max-w-md mx-auto">
        <Link to="/signup">
          <button
            className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105 border border-black"
          >
            Signup
          </button>
        </Link>
        <h1 className="mb-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold font-protest-riot font-rubik-doodle text-black text-center">
          GOT $5 ON IT...?
        </h1>

        <Link to="/login">
          <button
            className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105 border border-black"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
