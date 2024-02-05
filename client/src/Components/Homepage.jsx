
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='"container mx-auto px-4 sm:px-6 lg:px-8"'>
      <h1>Econ-o-Me</h1>
      <p>Got 5 on it? </p>
      <p>Lets see</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default HomePage;
