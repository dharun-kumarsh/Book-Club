import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import loginImg from '/login.jpeg';
import signupImg from '/signup.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = (e) => {
    e.preventDefault();

    const usernamePattern = /^3115\d{2}205\d{3}$/;
    const passwordPattern = /^\d{10}$/;

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    if (!usernamePattern.test(username)) {
      toast.error("Invalid username format! Example: 311523205015");
      return;
    }

    if (!passwordPattern.test(password)) {
      toast.error("Password should be a 10-digit mobile number");
      return;
    }

    if (username === password) {
      toast.error("Password cannot be the same as the username");
      return;
    }

    toast.success("Login Successful 🎉");

    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-2">
        <div className="hidden lg:flex items-center justify-center bg-indigo-100">
          <img
            src={isSignUp ? signupImg : loginImg}
            alt="Auth Illustration"
            className="w-full h-full transition-all hover:scale-105 duration-800 ease-in-out"
          />
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex transition-transform duration-800 ease-in-out" style={{ transform: isSignUp ? "translateX(-100%)" : "translateX(0)" }}>

            {/* Login Form */}
            <div className="w-full flex-shrink-0 p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
              <p className="text-gray-600 text-center mb-6">Sign in to access your account</p>
              <form className="w-full" onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Username</label>
                  <input 
                    type="text" 
                    placeholder="Enter your register number" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                  />
                </div>

                <div className="mb-6 relative">
                  <label className="block text-gray-700 font-medium">Password</label>
                  <div className="relative w-full">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your mobile number" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12" 
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

                <Button type="submit" className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-green-800">
                  Sign In
                </Button>
                <ToastContainer />
              </form>
              <p className="text-md mt-4">
                Don't have an account?
                <span className="text-red-600 cursor-pointer ml-1" onClick={() => setIsSignUp(true)}>Sign Up</span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
