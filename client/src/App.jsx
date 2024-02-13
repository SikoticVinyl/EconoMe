import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import './index.css';
import OverviewPage from './Components/OverviewPage';
import UpdateBudget from './Components/updateBudget';
import UserProfilepage from './Components/userProfilepage';
import userSettings from './Components/usersettings';
import detailBudget from './Components/detailBudget';
import Header from './components/header';
import Footer from './components/footer';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

<div className="min-h-screen bg-blue-100 flex items-center justify-center">
		<h1 className="text-4xl font-bold text-blue-900">App</h1>
	</div>;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overviewpage" element={
					<div>
						<Header />
						<OverviewPage />
						<Footer />
					</div>
				} />
				<Route path="/updateBudget" element={<UpdateBudget />} />
				<Route path="/userProfilepage" element={<UserProfilepage />} />
				<Route path="/userSettings" element={<userSettings />} />
				<Route path="/detailBudget" element={
					<div>
						<Header />
						<detailBudget />
						<Footer />
					</div>
				} />
        <Route path="/updateBudget" element={<UpdateBudget />} />
        <Route path="/userProfilepage" element={<UserProfilepage />} />
        <Route path="/userSettings" element={<userSettings />} />
        <Route path="/detailBudget" element={<detailBudget />} />
      </Routes>
    </Router>
  );
}

export default App;
