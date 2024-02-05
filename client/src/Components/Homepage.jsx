
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <p>This is a place where you can login or signup to access exclusive features.</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default HomePage;
