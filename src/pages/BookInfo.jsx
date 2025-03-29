import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { books } from "@/components/booksData";
import { FaBook, FaUser, FaTag, FaCalendarAlt, FaLanguage, FaBookOpen } from "react-icons/fa";

const BookInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <motion.p
        className="text-center text-red-500 text-xl mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Book not found
      </motion.p>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="bg-primary hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300 mb-6 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.img
          src={book.img}
          alt={book.title}
          className="w-full md:w-80 h-auto object-cover rounded-xl shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="flex-1">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-6 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaBook className="mr-2" /> {book.title}
          </motion.h1>

          <motion.div
            className="text-xl gap-2 text-black mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FaUser className="mr-1.5 text-xl" />
            <span className="font-semibold">Author:</span> {book.author}
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaBookOpen className="text-xl" />
              <span className="text-lg font-semibold">Description:</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {book.description || `Description not available.`}
            </p>
          </motion.div>

          <motion.div
            className="mt-4 flex gap-2 items-center text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <FaTag className="mr-2" />
            <span className="font-semibold">Genre:</span> {book.category}
          </motion.div>

          <motion.div
            className="mt-4 flex gap-2 items-center text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <FaCalendarAlt className="mr-2" />
            <span className="font-semibold">Year:</span> {book.year || 'Not Available'}
          </motion.div>

          <motion.div
            className="mt-4 flex gap-2 items-center text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <FaLanguage className="mr-2" />
            <span className="font-semibold">Language:</span> {book.language || 'Not Available'}
          </motion.div>

          <motion.button
            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 shadow-md text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Read Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookInfo;