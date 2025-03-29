import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash, FiAlertTriangle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Downloads() {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "A Game Of Thrones",
      author: "George R.R. Martin",
      genre: "Fantasy",
      pages: 694,
      date: "2025-03-12",
      img: "/book1.jpeg",
    },
    {
      id: 2,
      title: "The Colour Of Magic",
      author: "Terry Pratchett",
      genre: "Fantasy",
      pages: 285,
      date: "2025-02-27",
      img: "/book2.jpeg",
    },
    {
      id: 3,
      title: "Dracula",
      author: "Bram Stoker",
      genre: "Horror",
      pages: 418,
      date: "2025-01-15",
      img: "/book7.jpg",
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  // Function to confirm deletion
  const confirmDelete = () => {
    if (selectedBook) {
      setDownloads(downloads.filter((book) => book.id !== selectedBook.id));
      toast.info(`"${selectedBook.title}" removed from downloads.`);
      setSelectedBook(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <ToastContainer />

      <motion.div
        className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold mb-6">⬇️ Your Downloads</h2>

        {downloads.length === 0 ? (
          <p className="text-gray-500 text-2xl">No downloads available.</p>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {downloads.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="flex items-center bg-gray-50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Book Image */}
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-28 h-36 object-cover rounded-md"
                  />

                  {/* Book Details */}
                  <div className="flex-1 ml-6 text-left">
                    <h3 className="text-2xl font-semibold">{book.title}</h3>
                    <p className="text-gray-600 text-lg">👤 {book.author}</p>
                    <p className="text-gray-600 text-lg">📖 {book.pages} pages</p>
                    <p className="text-gray-600 text-lg">📅 Downloaded on: {book.date}</p>
                    <p className="text-gray-600 text-lg">📚 Genre: {book.genre}</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="text-red-500 hover:text-red-700 transition-all text-3xl"
                  >
                    <FiTrash />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <FiAlertTriangle className="text-red-500 text-5xl mx-auto mb-4" />
              <h3 className="text-3xl font-semibold">Delete "{selectedBook.title}"?</h3>
              <p className="text-gray-600 text-lg mb-6">
                Are you sure you want to remove this book from your downloads?
              </p>

              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-6 py-3 bg-gray-300 rounded-md text-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Downloads;
