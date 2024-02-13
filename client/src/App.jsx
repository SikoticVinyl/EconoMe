// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainPage from "./Components/Mainpage";
import HomePage from "./Components/HomePage"; // import HomePage component
import "./App.css";
import OverviewPage from "./Components/OverviewPage"; // rename overviewpage to OverviewPage
import UpdateBudget from "./Components/updateBudget";
import UserProfilepage from "./Components/userProfilepage";
import userSettings from "./Components/userSettings";
import detailBudget from "./Components/detailBudget";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/homepage" element={<HomePage />} /> {/* add this line */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overviewpage" element={<OverviewPage />} /> {/* render OverviewPage */}
        <Route path="/updateBudget" element={<UpdateBudget />} />
        <Route path="/userProfilepage" element={<UserProfilepage />} />
        <Route path="/userSettings" element={<userSettings />} />
        <Route path="/detailBudget" element={<detailBudget />} />
       
      </Routes>
    </Router>
    
  );
}
export default App;














