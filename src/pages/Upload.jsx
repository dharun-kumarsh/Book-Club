// Uploads.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiFileText, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Uploads({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) return;

    if (selectedFiles.length > 1) {
      toast.error('Please upload only one file at a time.');
      event.target.value = null;
      return;
    }

    const selectedFile = selectedFiles[0];

    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF file.');
      event.target.value = null;
      return;
    }

    setFile(selectedFile);
    toast.success('File selected successfully!');
  };

  const handleUpload = async () => {
    if (!bookName.trim() || !genre.trim() || !authorName.trim() || !pageCount.trim() || !publishDate.trim()) {
      setError('All fields are required!');
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!file) {
      setError('Please select a file!');
      toast.error('No file selected!');
      return;
    }

    setError('');
    setUploading(true);
    toast.info('Uploading file...');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('/upload-pdf', formData);
      const { imageUrl } = response.data;

      const newBook = {
        id: Date.now(),
        title: bookName,
        category: genre,
        author: authorName,
        pages: pageCount,
        publishDate: publishDate,
        img: imageUrl,
      };

      if (onUploadSuccess) {
        onUploadSuccess(newBook);
      }

      setUploading(false);
      setUploadSuccess(true);
      toast.success('File uploaded successfully!');

      setFile(null);
      setBookName('');
      setGenre('');
      setAuthorName('');
      setPageCount('');
      setPublishDate('');
    } catch (uploadError) {
      setUploading(false);
      setError('Upload failed. Please try again.');
      toast.error('Upload failed. Please try again.');
      console.error('Upload error:', uploadError);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadSuccess(false);
    toast.info('File removed. You can upload a new file.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <ToastContainer />

      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-800">📤 Upload Your Book</h2>

        {!uploadSuccess && !file && (
          <motion.div
            className="border-2 border-dashed border-purple-400 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer bg-purple-50 hover:bg-purple-100 transition"
            whileHover={{ scale: 1.05 }}
          >
            <FiUploadCloud className="text-purple-500 text-6xl mb-4" />
            <p className="text-lg text-gray-700">Drag & Drop file here or</p>
            <label className="mt-3 cursor-pointer bg-purple-600 text-white px-5 py-3 rounded-md hover:bg-purple-700 transition">
              Browse File
              <input type="file" onChange={handleFileChange} className="hidden" accept="application/pdf" />
            </label>
          </motion.div>
        )}

        {file && (
          <motion.div className="mt-6">
            <h3 className="font-semibold text-gray-700 text-lg mb-2">Selected File:</h3>
            <motion.div
              className="flex items-center justify-between bg-purple-100 p-3 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <FiFileText className="text-purple-600 text-xl" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                <FiX className="text-xl" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {(file || uploadSuccess) && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter Book Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter Book Genre (e.g., Fiction, Sci-Fi, Thriller)"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter Author Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
            <input
              type="number"
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
              placeholder="Enter Number of Pages"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />

            {error && (
              <motion.div
                className="text-red-600 text-lg flex items-center justify-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FiAlertCircle className="mr-2" />
                {error}
              </motion.div>
            )}

            {!uploadSuccess && (
              <motion.button
                onClick={handleUpload}
                className="mt-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-lg"
                whileHover={{ scale: 1.05 }}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </motion.button>
            )}

            {uploadSuccess && (
              <div className="flex items-center justify-center mt-6 text-green-600 text-2xl">
                <FiCheckCircle className="mr-2" />
                Uploaded Successfully!
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Uploads;