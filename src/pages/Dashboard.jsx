import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiInfo, FiDownload, FiUpload, FiUser, FiMoon, FiSun } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const books = [
  { id: 1, title: "A Game Of Thrones", author: "George RR Martin", img: "/book1.jpg", category: "Classic" },
  { id: 2, title: "The Colour Of Magic", author: "Terry Pratchett", img: "/book2.jpg", category: "Dystopian" },
  { id: 3, title: "The Lord of the Rings", author: "JRR Tolkien", img: "/book3.jpeg", category: "Classic" },
  { id: 4, title: "Jonathan Strange & Mr Norrell", author: "Susanna Clarke", img: "/book4.jpg", category: "Romance" },
  { id: 5, title: "The Name of the Wind", author: "Patrick Rothfuss", img: "/book5.jpg", category: "Self-Help" },
  { id: 6, title: "Carrion Comfort", author: "Dan Simmons", img: "/book6.jpg", category: "Self-Help" },
  { id: 7, title: "Dracula", author: "Bram Stoker", img: "/book7.jpg", category: "Fantasy" },
];

function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const location = useLocation();

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#1a1a2e] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-72 h-screen fixed top-0 left-0 p-6 flex flex-col justify-between shadow-lg transition-all duration-500 ${
          darkMode ? "bg-[#16213e]" : "bg-white"
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold mb-10 flex items-center justify-center space-x-2">
            📖 <span>E-Book Hub</span>
          </h1>
          <nav className="space-y-3">
            <SidebarItem to="/dashboard" icon={<FiHome />} text="Home" darkMode={darkMode} />
            <SidebarItem to="/dashboard/about" icon={<FiInfo />} text="About" darkMode={darkMode} />
            <SidebarItem to="/dashboard/downloads" icon={<FiDownload />} text="Downloads" darkMode={darkMode} />
            <SidebarItem to="/dashboard/upload" icon={<FiUpload />} text="Uploads" darkMode={darkMode} />
            <SidebarItem to="/dashboard/profile" icon={<FiUser />} text="Profile" darkMode={darkMode} />
          </nav>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
            darkMode ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 transition-all">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {location.pathname === "/dashboard" ? (
              <>
                <BookSection title="📌 Recommended Books" books={books.slice(0, 4)} darkMode={darkMode} />
                <BookSection title="🔥 Trending Books" books={books.slice(3, 7)} darkMode={darkMode} autoScroll />
              </>
            ) : (
              <Outlet />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const SidebarItem = ({ to, icon, text, darkMode }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"} 
    className={({ isActive }) =>
      `relative flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
        isActive
          ? darkMode
            ? "bg-yellow-500 text-gray-900"
            : "bg-primary text-white"
          : darkMode
          ? "hover:bg-gray-700"
          : "hover:bg-primary hover:text-white"
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

const BookSection = ({ title, books, autoScroll, darkMode }) => {
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setScrollX((prev) => (prev > -((books.length - 1) * 200) ? prev - 200 : 0));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [books.length, autoScroll]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <motion.div className="flex space-x-4 overflow-auto w-full">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`w-48 select-none p-4 rounded-lg shadow-lg cursor-pointer transition-all ${
              darkMode ? "bg-[#111827] text-white" : "bg-white text-gray-900"
            }`}
            style={autoScroll ? { transform: `translateX(${scrollX}px)`, transition: "transform 0.8s ease-in-out" } : {}}
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full hover:scale-105 transition-all object-cover rounded-lg"
            />
            <h3 className="mt-3 text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-500">{book.author}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
