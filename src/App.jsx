import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./components/auth/Authentication";
import About from "./pages/About";
import Downloads from "./pages/Downloads";
import Uploads from "./pages/Upload";
import Profile from "./pages/Profile";

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`${darkMode ? "bg-[#1a1a2e] text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-all`}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="about" element={<About />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="upload" element={<Uploads />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
