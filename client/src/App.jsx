// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import MainPage from "./Components/Mainpage";
import HomePage from "./Components/HomePage"; // import HomePage component
import './index.css';
import OverviewPage from "./Components/OverviewPage"; // rename overviewpage to OverviewPage
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
  <div className="min-h-screen bg-blue-100 flex items-center justify-center">
  <h1 className="text-4xl font-bold text-blue-900">App</h1>
</div>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/homepage" element={<HomePage />} /> {/* add this line */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/overviewpage" element={<OverviewPage />} /> {/* render OverviewPage */}
      </Routes>
    </Router>
    
  );
}
export default App;














