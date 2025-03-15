import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold mb-4">ℹ️ About</h2>
      <p>This is an E-Book platform for managing and reading digital books.</p>
    </motion.div>
  );
}

export default About;
