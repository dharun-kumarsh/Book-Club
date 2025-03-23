import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiInfo, FiDownload, FiUpload, FiUser, FiMoon, FiSun, FiSearch } from "react-icons/fi";
import { ThemeContext } from "../ThemeContext";

const SideNav = ({ onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query); // Calls the search function in the parent component
  };

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "About", path: "/dashboard/about", icon: <FiInfo size={20} /> },
    { name: "Downloads", path: "/dashboard/downloads", icon: <FiDownload size={20} /> },
    { name: "Uploads", path: "/dashboard/upload", icon: <FiUpload size={20} /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FiUser size={20} /> },
  ];

  return (
    <aside className={`w-72 h-screen fixed top-0 left-0 p-6 flex flex-col justify-between shadow-lg transition-all duration-500 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>

      {/* Search Bar at the Top */}
      <div className="relative w-full mt-10">
        <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Genres..."
          className="w-full p-2 pl-10 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
        />
      </div>

      {/* Navigation Links */}
      <nav className="w-full space-y-3">
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

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="mt-6 flex items-center space-x-3 p-3 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all"
      >
        {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </aside>
  );
};

export default SideNav;
