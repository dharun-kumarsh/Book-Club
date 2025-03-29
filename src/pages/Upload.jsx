import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiX, FiFileText, FiAlertCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Uploads() {
  const [file, setFile] = useState(null);
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;
    
    // Allow only one file upload
    setFile(selectedFile);
    toast.success("File selected successfully!");
  };

  const handleUpload = () => {
    if (!bookName.trim() || !genre.trim() || !authorName.trim() || !pageCount.trim() || !publishDate.trim()) {
      setError("All fields are required!");
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!file) {
      setError("Please select a file!");
      toast.error("No file selected!");
      return;
    }

    setError("");
    setUploading(true);
    toast.info("Uploading file...");

    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      toast.success("File uploaded successfully!");
      setFile(null); // Remove the file after successful upload
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <ToastContainer />

      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">📤 Upload Your Book</h2>

        {/* Show Upload Section Only If Not Uploaded */}
        {!uploadSuccess && (
          <motion.div
            className="border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FiUploadCloud className="text-gray-500 text-5xl mb-3" />
            <p className="text-gray-700">Drag & Drop file here or</p>
            <label className="mt-2 cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
              Browse File
              <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.epub" />
            </label>

            {/* Show Selected File */}
            {file && (
              <motion.div className="mt-4">
                <h3 className="font-semibold text-gray-700">Selected File:</h3>
                <motion.div
                  className="flex items-center justify-between bg-gray-200 p-2 rounded-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <FiFileText className="text-gray-600" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
                    <FiX />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Show Input Fields after Upload */}
        {(file || uploadSuccess) && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Book Name Input */}
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter Book Name"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Genre Input */}
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter Book Genre (e.g., Fiction, Sci-Fi, Thriller)"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Author Name Input */}
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter Author Name"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Page Count Input */}
            <input
              type="number"
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
              placeholder="Enter Number of Pages"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Publish Date Input */}
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Error Message */}
            {error && (
              <motion.div
                className="text-red-600 text-sm flex items-center justify-center mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FiAlertCircle className="mr-2" />
                {error}
              </motion.div>
            )}

            {/* Upload Button */}
            {!uploadSuccess && (
              <motion.button
                onClick={handleUpload}
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                whileHover={{ scale: 1.05 }}
              >
                {uploading ? "Uploading..." : "Upload File"}
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Uploads;
