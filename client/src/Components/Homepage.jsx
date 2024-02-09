import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-green-500 min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1
          style={{ fontFamily: "'Vina Sans', sans-serif" }}
          className="mb-4 text-6xl font-bold font-rubik-doodle"
        >
          {" "}
          GOT $5{" "}
        </h1>

        <button className="px-4 py-2 font-moirai text-2xl bg-blue-500 text-white rounded shadow-md animate-bounce transition-transform duration-300 ease-in-out hover:scale-105">
          <Link to="/login" className="text-white">
            Login
          </Link>
        </button>
        <button className="px-4 py-2 font-moirai text-2xl bg-blue-500 text-white rounded shadow-md animate-bounce transition-transform duration-300 ease-in-out hover:scale-105">
          <Link to="/signup" className="text-white">
            Signup
          </Link>
        </button>
        <h1
          style={{ fontFamily: "'Vina Sans', sans-serif" }}
          className="mb-4 text-6xl font-bold font-rubik-doodle"
        >
          {" "}
          ON IT ?{" "}
        </h1>
      </div>
    </div>
  );
}
export default HomePage;
