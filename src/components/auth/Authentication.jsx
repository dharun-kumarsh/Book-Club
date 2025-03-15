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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Allowed department codes
  const validDeptCodes = ["103", "104", "105", "106", "114", "205"];

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

  const isValidMobileNumber = (mobNo) => /^\d{10}$/.test(mobNo);

  const handleAuth = (e) => {
    e.preventDefault();

    if ((!isLogin && !name) || !registerNumber || !password) {
      toast.error("⚠️ Please enter all fields!");
      return;
    }

    if (!isValidRegisterNumber(registerNumber)) {
      toast.error("❌ Invalid Register Number! Format: 3115YYDXXX (e.g., 311523205015)");
      return;
    }

    if (!isValidMobileNumber(password)) {
      toast.error("🔒 Password must be a 10-digit mobile number!");
      return;
    }

    if (registerNumber === password) {
      toast.error("⚠️ Password cannot be the same as the Register Number!");
      return;
    }

    if (!isLogin) {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({ name, registerNumber, password })
      );
      toast.success("✅ Signup Successful! 🎉");
      setIsLogin(true);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser || storedUser.registerNumber !== registerNumber || storedUser.password !== password) {
      toast.error("❌ Invalid credentials! Please sign up first.");
      return;
    }

    toast.success(`✅ Welcome back, ${storedUser.name}!`);
    setTimeout(() => {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Image Section with Animation */}
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

        {/* Form Section with Animation */}
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
                
                {/* Name Field - Only for Signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-700 font-medium">Password</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "tel" : "password"}
                      placeholder="Enter your mobile number"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
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
