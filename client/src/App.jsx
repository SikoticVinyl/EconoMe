import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import OverviewPage from './Components/OverviewPage';
import CreateBudget from './Components/CreateBudget';
import UserProfilePage from './Components/UserProfilePage';
import UserSettings from './Components/UserSettings';
import DetailBudget from './Components/DetailBudget';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UpdateBudget from './Components/UpdateBudget';
import UpdateFooter from './Components/UpdateFooter';
import './index.css';

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

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/overview-page" element={<><Header /><OverviewPage /><Footer /></>} />
          <Route path="/create-budget" element={<CreateBudget />} />
          <Route path="/user-profile-page" element={<UserProfilePage />} />
          <Route path="/user-settings" element={<UserSettings />} />
          <Route path="/detail-budget" element={<><Header /><DetailBudget /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
