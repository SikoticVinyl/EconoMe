import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<div className="bg-custom-background bg-cover min-h-screen flex flex-col items-center justify-center space-y-4">
			<div className="min-h-screen flex flex-col items-center justify-center space-y-4">
				<button className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105">
					<Link to="/signup" className="text-white">
						Signup
					</Link>
				</button>
				<h1 className="mb-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold font-protest-riot font-old-standard-tt text-white">
					GOT $5 ON IT...?
				</h1>

				<button className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105">
					<Link to="/login" className="text-black hover:text-white">
						Login
					</Link>
				</button>
			</div>
		</div>
	);
}
export default HomePage;
