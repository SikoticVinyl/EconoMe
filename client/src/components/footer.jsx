import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-transparent flex justify-center items-center fixed bottom-0 bg-opacity-50">
      <Link
        to="/update-budget"
        className="w-full md:w-auto px-10 py-2 h-20 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer transform transition flex justify-center rounded"
      >
        <span className="text-4xl">Update Budget</span>
      </Link>
    </footer>
  );
};

export default Footer;
