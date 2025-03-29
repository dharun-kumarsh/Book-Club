import React, { useState, useEffect } from 'react';
import {
  FiHome,
  FiInfo,
  FiDownload,
  FiUpload,
  FiUser,
  FiLogOut,
  FiBookOpen,
  FiSearch,
} from 'react-icons/fi';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { books as initialBooks } from '@/components/booksData';
import Uploads from './Upload';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    const storedUploadedBooks = JSON.parse(localStorage.getItem('uploadedBooks')) || [];
    setUploadedBooks(storedUploadedBooks);
    setBooks([...initialBooks, ...storedUploadedBooks]);
  }, []);

  useEffect(() => {
    localStorage.setItem('uploadedBooks', JSON.stringify(uploadedBooks));
    setBooks([...initialBooks, ...uploadedBooks]);
  }, [uploadedBooks]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logged out successfully!', { position: 'top-right', autoClose: 1500 });
    setTimeout(() => navigate('/'), 1500);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const booksByGenre = books.reduce((acc, book) => {
    const genre = book.category.toLowerCase();
    if (!acc[genre]) acc[genre] = [];
    acc[genre].push(book);
    return acc;
  }, {});

  const recommendedBooks = Object.values(booksByGenre).map((books) => books[0]);

  useEffect(() => {
    if (normalizedQuery) {
      const results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.category.toLowerCase().includes(normalizedQuery)
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  }, [normalizedQuery, books]);

  const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleBookUpload = (newBook) => {
    setUploadedBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
      navigate(`/dashboard/book/${book.id}`);
    };

    return (
      <motion.div
        className="bg-white shadow-md p-4 rounded-lg flex flex-col cursor-pointer hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        onClick={handleBookClick}
      >
        <img src={book.img} alt={book.title} className="w-full h-64 object-cover rounded-md" />
        <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-500">{book.author}</p>
      </motion.div>
    );
  };

  return (
    <motion.div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <ToastContainer />

      <motion.aside
        className={`h-screen fixed top-0 left-0 p-6 shadow-lg bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
          }`}
      >
        <motion.div
          className="text-3xl font-bold mb-6 flex items-center cursor-pointer"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FiBookOpen className="text-gray-600 dark:text-white" />
          <span
            className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
              }`}
          >
            Book Arena
          </span>
        </motion.div>

        <nav className="space-y-4">
          <SidebarItem
            to="/dashboard"
            icon={FiHome}
            text="Home"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/about"
            icon={FiInfo}
            text="About"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/downloads"
            icon={FiDownload}
            text="Downloads"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/upload"
            icon={FiUpload}
            text="Uploads"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/dashboard/profile"
            icon={FiUser}
            text="Profile"
            isOpen={isSidebarOpen}
          />
        </nav>

        <motion.button
          onClick={handleLogout}
          className="mt-auto flex items-center p-3 rounded-lg transition-all bg-red-500 text-white hover:bg-red-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLogOut />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </motion.button>
      </motion.aside>

      <motion.div
        className="flex-1 p-10 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? '16rem' : '5rem' }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {location.pathname === '/dashboard' && (
          <>
            <motion.div className="w-full flex justify-center mb-10">
              <div className="relative w-full max-w-xl">
                <FiSearch className="absolute left-4 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Title or Genre..."
                  className="w-full p-3 pl-12 rounded-lg bg-white shadow-sm text-gray-800"
                />
              </div>
            </motion.div>

            {normalizedQuery ? (
              filteredBooks.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">🔍 Search Results</h2>
                  <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </motion.div>
                </>
              ) : (
                <p className="text-center text-gray-500">No books found.</p>
              )
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">📚 Recommended Books</h2>
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {recommendedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </motion.div>

                {uploadedBooks.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">🚀 Newly Uploaded Books</h2>
                    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {uploadedBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </motion.div>
                  </div>
                )}

                {Object.entries(booksByGenre).map(([genre, books]) => (
                  <div key={genre} className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">{toSentenceCase(genre)}</h2>
                    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </motion.div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        {location.pathname === '/dashboard/upload' && (
          <Uploads onUploadSuccess={handleBookUpload} />
        )}
        <Outlet />
      </motion.div>
    </motion.div>
  );
}


const SidebarItem = ({ to, icon: Icon, text, isOpen }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-all ${isActive
          ? 'bg-primary text-white font-semibold'
          : 'text-gray-700 hover:bg-gray-200'
        }`
      }
    >
      <Icon
        className={`transition-all duration-300 ${isOpen ? 'text-lg' : 'text-3xl' // Increase icon size when closed
          } ${isOpen ? '' : 'mr-0'}`}
      />
      {isOpen && (
        <span
          className={`ml-3 transition-all duration-300 font-semibold`}
        >
          {text}
        </span>
      )}
    </NavLink>
  );
};

export default Dashboard;