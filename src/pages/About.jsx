import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function About() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center px-6 transition-all duration-500 text-primary dark:bg-gray-900 dark:text-white"
    >
      {/* About Card */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-8 rounded-lg shadow-lg max-w-3xl text-center transition-all duration-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
      >
        <h2 className="text-4xl font-bold mb-4">📚 About E-Book Hub</h2>
        <p className="text-lg">
          Welcome to <span className="font-semibold">E-Book Hub</span> – a modern digital library designed for book lovers, students, and professionals.
          Access a <strong>vast collection of e-books</strong>, enjoy an <strong>interactive reading experience</strong>, and manage your digital bookshelf with ease. 📖✨
        </p>

        {/* Features Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard icon="📖" title="Vast Library" description="Access thousands of e-books across multiple genres." />
          <FeatureCard icon="⚡" title="Fast & Lightweight" description="Optimized for smooth and lag-free reading." />
          <FeatureCard icon="🎨" title="Beautiful UI" description="Clean, modern, and easy-to-use interface." />
          <FeatureCard icon="🔒" title="Secure & Private" description="Your data and preferences remain confidential." />
          <FeatureCard icon="🌙" title="Dark Mode" description="Read comfortably with an eye-friendly dark theme." />
          <FeatureCard icon="📂" title="Offline Access" description="Download books and read them anytime, anywhere." />
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-lg leading-relaxed"
        >
          <p>
            Whether you are a <span className="font-semibold text-red-500">Student</span>, a <span className="font-semibold text-red-500">Working Professional</span>, or an <span className="font-semibold text-red-500">Avid Reader</span>,
            E-Book Hub is designed to cater to all your reading needs.
            Enjoy a distraction-free experience with <span className="font-semibold text-red-500">customizable fonts, themes, and note-taking features to enhance your reading journey</span>.
          </p>
        </motion.div>

        {/* CTA Button - Navigates to Dashboard */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/dashboard")} // Navigate to Dashboard
          className="mt-6 px-6 py-3 rounded-full font-semibold text-lg shadow-md transition-all bg-white text-[#512] hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Start Exploring 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 rounded-lg shadow-md text-center shadow-white/15 backdrop-blur-lg transition-all bg-white text-gray-950 dark:bg-gray-700 dark:text-white"
  >
    <div className="text-4xl">{icon}</div>
    <h3 className="font-semibold text-xl mt-2">{title}</h3>
    <p className="text-sm mt-1 opacity-80">{description}</p>
  </motion.div>
);

export default About;
