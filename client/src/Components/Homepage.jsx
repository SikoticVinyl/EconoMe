import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-custom-background bg-cover min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <button
          className="px-1 py-1 font-old-standard-tt text-sm bg-black text-white rounded shadow-md 
            animate-bounce transition-transform duration-300 ease-in-out hover:scale-105 absolute top-0 right-0 m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12"
        >
          <Link to="/signup" className="text-white">
            Signup
          </Link>
        </button>
        <h1 className="mb-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold font-protest-riot font-old-standard-tt text-white">
          GOT $5 ON IT...?
        </h1>

        <button
          className="px-4 py-2 font-old-standard-tt text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 text-black rounded shadow-md 
            transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <Link to="/login" className="text-black hover:text-white">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
export default HomePage;
