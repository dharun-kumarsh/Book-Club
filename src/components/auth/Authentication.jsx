import React, { useState } from 'react';
import { Button } from '../ui/button';
import loginImg from '/login.jpeg'; 
import signupImg from '/signup.jpeg'; 

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

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
              <p className="text-gray-600 text-center mb-6">Sign in to access your favourite Books</p>
              <form className="w-full">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Username</label>
                  <input type="username" placeholder="Enter your Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium">Password</label>
                  <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <a href="#" className="text-indigo-500 text-md">Forgot password?</a>
                <Button className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-green-800">Sign In</Button>
              </form>
              <p className="text-md mt-4">
                Don't have an account?  
                <span className="text-red-600 cursor-pointer ml-1" onClick={() => setIsSignUp(true)}>Sign Up</span>
              </p>
            </div>

            {/* Sign Up Form */}
            <div className="w-full flex-shrink-0 p-8 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
              <p className="text-gray-600 text-center mb-6">Join us today!</p>
              <form className="w-full">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Username</label>
                  <input type="username" placeholder="Enter your Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium">Password</label>
                  <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <Button className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-green-800">Sign Up</Button>
              </form>
              <p className="text-md mt-4">
                Already have an account?  
                <span className="text-red-600 cursor-pointer ml-1" onClick={() => setIsSignUp(false)}>Sign In</span>
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
