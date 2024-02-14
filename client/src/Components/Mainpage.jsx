// MainPage.jsx
import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';
import '../index.css';
import nightModeIcon from '../assets/nightmode-svgrepo-com.svg';

function MainPage({}) {
  
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-gray-900">
			<div className="fixed top-0 right-0 m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12">
				<button
					onClick={e => {
						toggleDarkMode();
						e.currentTarget.blur();
					}}
					className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
				>
					<img src={nightModeIcon} alt="Toggle dark mode" className="w-6 h-6" />{' '}
					{/* use your SVG as the button's icon */}
				</button>
			</div>
			<div className="flex flex-col items-center justify-center space-y-4">
				<a href="" alt="Logo" target="_blank" rel="noopener noreferrer">
					<img
						src={viteLogo}
						className="w-32 h-32 hover:animate-spin sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48"
						alt="Vite logo"
					/>
				</a>
				<h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-rubik-doodle text-color5">
					EconoMe
				</h1>
				<svg
					className="animate-bounce w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
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
					<button className="px-4 py-2 bg-gray-800 text-white rounded shadow-xl hover:bg-gray-700 active:scale-90 cursor-pointer duration-300 active:scale-90 transform transition hover:scale-105 ">
						Lets get started
					</button>
				</Link>
				<div className="mb-4">
					{/* ... other elements ... */}
					<Link to="/overviewpage" className="text-blue-500 hover:underline">
						Go to Overview Page
					</Link>
				</div>
				
			</div>
			<footer className="mt-auto w-full h-16 text-sm text-center bg-gray-200 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 ">
				&copy; {new Date().getFullYear()} EconoMe
			</footer>
		</div>
	);
}

export default MainPage;
