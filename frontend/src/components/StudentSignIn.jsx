import React from 'react'
import { useState } from 'react'
import logo from '../assets/icons/EduQuest.png'
function StudentSignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Blue Section with Logo */}
      <div className="flex-1 bg-blue-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-64 h-64 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <div className="text-blue-100 mb-2">
              <img src={logo} className="ml-2 h-22 w-22 object-contain"/>
              <div className="text-2xl font-semibold tracking-wider">
                EduQuest
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold  text-center mb-8">
              Student Login
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium  mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium  mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-100 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition duration-200 font-medium text-lg"
              >
                Login
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="">
                Don't have an account?{' '}
                <a href="#" className="text-blue-200 hover:text-white font-medium">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default StudentSignIn
