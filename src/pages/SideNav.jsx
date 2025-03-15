import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiInfo, FiDownload, FiUpload, FiUser, FiMoon, FiSun } from "react-icons/fi";

const SideNav = ({ darkMode, setDarkMode }) => {
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "About", path: "/about", icon: <FiInfo size={20} /> },
    { name: "Downloads", path: "/downloads", icon: <FiDownload size={20} /> },
    { name: "Uploads", path: "/upload", icon: <FiUpload size={20} /> },
    { name: "Profile", path: "/profile", icon: <FiUser size={20} /> },
  ];

  return (
    <aside className={`w-72 h-screen fixed top-0 left-0 p-6 flex flex-col justify-between shadow-lg transition-all duration-500 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div>
        <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">📖 E-Book Hub</h1>
        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-indigo-500 text-white" : "hover:bg-indigo-500 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center space-x-3 p-3 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </aside>
  );
};

export default SideNav;
