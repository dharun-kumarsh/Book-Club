import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import loginImg from "/login.jpeg";
import signupImg from "/signup.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const validDeptCodes = ["103", "104", "105", "106", "114", "205", "243"];

  const isValidRegisterNumber = (regNo) => {
    if (!/^\d{12}$/.test(regNo)) return false;
    if (!regNo.startsWith("3115")) return false;

    const year = regNo.slice(4, 6);
    if (parseInt(year) < 22 || parseInt(year) > 30) return false;

    const deptCode = regNo.slice(6, 9);
    if (!validDeptCodes.includes(deptCode)) return false;

    const rollNo = regNo.slice(9, 12);
    if (parseInt(rollNo) < 1 || parseInt(rollNo) > 999) return false;

    return true;
  };

  const isValidDOB = (dob) => /^\d{2}\/\d{2}\/\d{4}$/.test(dob);

  // Format DOB as "DD/MM/YYYY" automatically
  const formatDOB = (input) => {
    let cleanInput = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (cleanInput.length > 8) cleanInput = cleanInput.slice(0, 8); // Limit to 8 digits

    let formattedDOB = cleanInput;
    if (cleanInput.length > 2) formattedDOB = cleanInput.slice(0, 2) + "/" + cleanInput.slice(2);
    if (cleanInput.length > 4) formattedDOB = formattedDOB.slice(0, 5) + "/" + cleanInput.slice(4);

    setDob(formattedDOB);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (!registerNumber || !dob || (!isLogin && !name.trim())) {
      toast.error("Please enter all fields!", { position: "top-right", autoClose: 1500 });
      return;
    }

    if (!isValidRegisterNumber(registerNumber)) {
      toast.error("Invalid Register Number! Format: (e.g., 311523205015)", { position: "top-right", autoClose: 1500 });
      return;
    }

    if (!isValidDOB(dob)) {
      toast.error("📅 Date of Birth must be in DD/MM/YYYY format!", { position: "top-right", autoClose: 1500 });
      return;
    }

    if (!isLogin) {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ name, registerNumber, dob })
      );
      toast.success("✅ Signup Successful! 🎉", { position: "top-right", autoClose: 1500 });
      setIsLogin(true);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser || storedUser.registerNumber !== registerNumber || storedUser.dob !== dob) {
      toast.error("❌ Invalid credentials! Please sign up first.", { position: "top-right", autoClose: 1500 });
      return;
    }

    toast.success(`✅ Welcome back,${storedUser.name}!`, { position: "top-right", autoClose: 1500 });
    setTimeout(() => {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-img" : "signup-img"}
            initial={{ x: isLogin ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:flex items-center justify-center bg-indigo-100"
          >
            <img
              src={isLogin ? loginImg : signupImg}
              alt="Auth Illustration"
              className="w-full h-full transition-all hover:scale-105 duration-500"
            />
          </motion.div>
        </AnimatePresence>

        <div className="w-full p-8 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "signup-form"}
              initial={{ x: isLogin ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                {isLogin ? "Welcome Back!" : "Create an Account"}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {isLogin ? "Sign in to access your favourite books" : "Sign up to get started"}
              </p>

              <form className="w-full space-y-4" onSubmit={handleAuth}>

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:shadow-md focus:border-primary cursor-text text-gray-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium">Register Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your Register Number"
                    value={registerNumber}
                    onChange={(e) => setRegisterNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:shadow-md focus:border-primary cursor-text text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Date of Birth (DD/MM/YYYY)</label>
                  <input
                    type="tel"
                    placeholder="Enter your DOB (e.g., 12/05/2004)"
                    value={dob}
                    onChange={(e) => formatDOB(e.target.value)}
                    maxLength="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:shadow-md focus:border-primary cursor-text text-gray-900"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary transition-all">
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>

              <p className="text-gray-600 mt-4 text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold cursor-pointer hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </span>
              </p>
            </motion.div>
          </AnimatePresence>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
