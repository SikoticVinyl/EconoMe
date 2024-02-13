import { Link } from 'react-router-dom'; // Ensure you've imported Link from react-router-dom

const Footer = () => {
	return (
		<footer className="w-screen bg-transparent flex justify-center items-center">
			<Link to="/updateBudget" className=" w-full px-3 py-2 h-20 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition flex justify-center">
				<span className='text-4xl'>Update Budget</span>
			</Link>
		</footer>
	);
};

export default Footer;
