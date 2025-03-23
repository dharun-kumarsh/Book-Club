import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiInfo, FiDownload, FiUpload, FiUser, FiSearch, FiBookOpen, FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const books = [
  { id: 1, title: "A Game Of Thrones", author: "George RR Martin", img: "/book1.jpeg", category: "Fantasy" },
  { id: 2, title: "The Colour Of Magic", author: "Terry Pratchett", img: "/book2.jpeg", category: "Fantasy" },
  { id: 3, title: "The Lord of the Rings", author: "JRR Tolkien", img: "/book3.jpeg", category: "Fantasy" },
  { id: 4, title: "Jonathan Strange & Mr Norrell", author: "Susanna Clarke", img: "/book4.jpeg", category: "Fantasy" },
  { id: 5, title: "The Name of the Wind", author: "Patrick Rothfuss", img: "/book5.jpeg", category: "Fantasy" },
  { id: 6, title: "Carrion Comfort", author: "Dan Simmons", img: "/book6.jpg", category: "Horror" },
  { id: 7, title: "The Terror", author: "Dan Simmons", img: "/book7.jpg", category: "Horror" },
  { id: 8, title: "Dracula", author: "Bram Stoker", img: "/book8.jpg", category: "Horror" },
  { id: 9, title: "Ghost Story", author: "Peter Straub", img: "/book9.jpeg", category: "Horror" },
  { id: 10, title: "The Strangler", author: "William Landay", img: "/book10.jpeg", category: "Horror" },
  { id: 11, title: "All the Devils Are Here", author: "Louise Penny", img: "/book11.jpeg", category: "Mystery" },
  { id: 12, title: "The Beast Must Die", author: "Cecil Day-Lewis", img: "/book12.jpg", category: "Mystery" },
  { id: 13, title: "Kitty Peck and the Music Hall Murders", author: "Kate Griffin", img: "/book13.jpeg", category: "Mystery" },
  { id: 14, title: "Sandrine's Case", author: "Thomas H. Cook", img: "/book14.jpg", category: "Mystery" },
  { id: 15, title: "Sandrine's Case", author: "Thomas H. Cook", img: "/book14.jpg", category: "Mystery" },
  { id: 16, title: "The House in the Pines", author: "Ana Reyes", img: "/book16.jpeg", category: "Thriller" },
  { id: 17, title: "The Martian", author: "Andy Weir", img: "/book17.jpeg", category: "Thriller" },
  { id: 18, title: "Monkey Beach", author: "Eden Robinson", img: "/book18.jpeg", category: "Thriller" },
];

const groupBooksByCategory = (books) => {
  return books.reduce((acc, book) => {
    if (!acc[book.category]) {
      acc[book.category] = [];
    }
    acc[book.category].push(book);
    return acc;
  }, {});
};

const handleBookDisplay = () => {

}

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    toast.success("Logged out successfully!", { position: "top-right", autoClose: 1000 });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const categorizedBooks = groupBooksByCategory(books);

  const filteredCategories = Object.keys(categorizedBooks).filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500">
      <ToastContainer />

      <header className="w-full flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0 shadow-md z-50 bg-white">
        <div className="flex items-center space-x-3 text-xl font-bold">
          <FiBookOpen size={28} />
          <span>E-Book Hub</span>
        </div>

        <div className="flex-grow flex justify-center">
          <div className="relative w-96">
            <FiSearch className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search genres..."
              className="w-full p-2 pl-10 rounded-md bg-gray-100 text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-500 text-white font-semibold transition-all hover:bg-red-600"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </header>

      <div className="flex pt-16">
        <aside className="w-72 h-screen fixed top-16 left-0 p-6 flex flex-col shadow-lg bg-white">
          <nav className="space-y-3">
            <SidebarItem to="/dashboard" icon={<FiHome />} text="Home" />
            <SidebarItem to="/dashboard/about" icon={<FiInfo />} text="About" />
            <SidebarItem to="/dashboard/downloads" icon={<FiDownload />} text="Downloads" />
            <SidebarItem to="/dashboard/upload" icon={<FiUpload />} text="Uploads" />
            <SidebarItem to="/dashboard/profile" icon={<FiUser />} text="Profile" />
          </nav>
        </aside>

        <main className="flex-1 ml-72 p-8 transition-all">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {location.pathname === "/dashboard" ? (
                <>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <BookSection key={category} title={category} books={categorizedBooks[category]} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-lg">No books found for the given genre.</p>
                  )}
                </>
              ) : (
                <Outlet />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

const SidebarItem = ({ to, icon, text }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    className={({ isActive }) =>
      `relative flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${isActive ? "bg-indigo-500 text-white" : "hover:bg-indigo-500 hover:text-white"
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

const BookSection = ({ title, books }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <motion.div className="flex space-x-4 overflow-auto w-full">
        {books.map((book, index) => (
          <motion.div
            onClick={handleBookDisplay}
            key={book.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ cursor: "pointer" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-48 select-none p-4 rounded-lg shadow-lg cursor-pointer transition-all bg-white text-gray-900"
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-40 h-56 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
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
