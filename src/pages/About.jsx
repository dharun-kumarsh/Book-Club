import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen transition-all duration-500">

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center py-20 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <span>E - Book Hub</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-3xl">
          Your ultimate digital library, designed for passionate readers, students, and professionals. 📖✨
          Discover thousands of books, enjoy a seamless reading experience, and manage your personal bookshelf effortlessly.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-8 py-3 rounded-full font-semibold text-lg shadow-md transition-all bg-slate-300"
        >
          Start Exploring 🚀
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="container mx-auto px-6 md:px-12 lg:px-24 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-12">🔥 Why Choose E-Book Hub?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon="📖" title="Massive Library" description="Thousands of e-books across multiple genres." />
          <FeatureCard icon="⚡" title="Blazing Fast" description="Optimized for seamless and lag-free reading." />
          <FeatureCard icon="🎨" title="Modern UI" description="Clean, minimalistic, and highly intuitive interface." />
          <FeatureCard icon="🔒" title="Privacy First" description="Your data and preferences remain secure & private." />
          <FeatureCard icon="🌙" title="Dark Mode" description="Read comfortably with an eye-friendly dark theme." />
          <FeatureCard icon="📂" title="Offline Access" description="Download books and read them anytime, anywhere." />
        </div>
      </motion.div>

      {/* Visual Divider */}
      <div className="w-full h-1 opacity-50 my-12" />

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center px-6 md:px-12 lg:px-24 py-16"
      >
        <h3 className="text-3xl font-bold mb-6">📚 Who is E-Book Hub for?</h3>
        <p className="text-lg md:text-xl max-w-4xl mx-auto">
          Whether you are a <span className="font-semibold">Student</span>, a
          <span className="font-semibold">Professional</span>,
          or an <span className="font-semibold">Avid Reader</span>,
          our platform is designed to enhance your reading experience.
          Customize fonts, switch between themes, and take notes effortlessly.
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex justify-center pb-16"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 rounded-full font-semibold text-lg shadow-md transition-all bg-slate-300"
        >
          Start Your Reading Journey 🚀
        </motion.button>
      </motion.div>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-lg border shadow-xl shadow-gray-400 text-center transition-all"
    >
      <div className="text-5xl">{icon}</div>
      <h3 className="font-semibold text-xl mt-4">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
    </motion.div>
  );
};

export default About;
