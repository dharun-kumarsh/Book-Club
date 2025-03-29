// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./components/auth/Authentication";
import About from "./pages/About";
import Downloads from "./pages/Downloads";
import Uploads from "./pages/Upload";
import Profile from "./pages/Profile";
import "./App.css";
import BookInfo from "./pages/BookInfo";

function App() {
  return (
    <div className="min-h-screen transition-all bg-slate-200 dark:bg-gray-800 text-gray-900 dark:text-white">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="about" element={<About />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="upload" element={<Uploads />} />
          <Route path="profile" element={<Profile />} />
          <Route path="book/:id" element={<BookInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;