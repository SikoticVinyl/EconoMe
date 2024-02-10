import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gradient-to-t from-blue-500 via-indigo-500 to-green-500 min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <button
  className="px-1 py-1 font-old-standard-tt text-sm bg-black text-white rounded shadow-md 
        animate-bounce transition-transform duration-300 ease-in-out hover:scale-105 absolute top-0 right-0 m-4"
>
  <Link to="/signup" className="text-white">
    Signup
  </Link>
</button>
        <h1 className="mb-4 text-6xl font-bold font-rubik-doodle font-old-standard-tt">
          GOT $5 ON IT..?
        </h1>

        <button
  className="px-4 py-2 font-old-standard-tt text-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 text-black rounded shadow-md 
         transition-transform duration-300 ease-in-out hover:scale-105"
>
  <Link to="/login" className="text-black hover:text-white">
    Login
  </Link>
</button>

        {/* <h1
          style={{ fontFamily: "'Vina Sans', sans-serif" }}
          className="mb-4 text-6xl font-bold font-rubik-doodle gradient-text"
        >
          {" "}
          ON IT ?{" "}
        </h1> */}
      </div>
    </div>
  );
}
export default HomePage;
