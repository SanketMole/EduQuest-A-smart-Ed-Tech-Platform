import React, { useState } from 'react'
import logo from '../assets/icons/EduQuest.png'

const Navbar = ({ toggleSidebar, isSidebarOpen, onSignOut, role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const isStudent = role === 'student'
  console.log(role)

  return (
    <nav className={`fixed top-0 left-0 right-0 h-20 ${isStudent ? 'bg-blue-950' : 'bg-blue-950'}  z-[100] `}>
      <div className="h-full">
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className={`p-2 text-white ${isStudent ? 'bg-blue-950 hover:bg-blue-400 border-white' : 'bg-blue-950 hover:bg-blue-700 border-white'} rounded-lg transition-colors duration-200`}
              aria-label="Toggle Sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className={`h-12 w-12 bg-blue-950 flex items-center justify-center`}>
                {/* <span className={`${isStudent ? 'text-blue-600' : 'text-blue-600'} text-xl font-bold`}>EQ</span>   */}
                <img 
                  src={logo} 
                  alt="EduQuest Logo" 
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">EduQuest</h1>
                <p className={`${isStudent ? 'text-blue-200' : 'text-blue-200'} text-xl`}>A smart Ed-Tech platform</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center space-x-3 text-white ${isStudent ? 'hover:bg-blue-950' : 'hover:bg-blue-950'} rounded-lg p-2 transition-colors duration-200`}
            >
              <div className={`h-12 w-12 ${isStudent ? 'bg-blue-500 hover:scale-115 origin-left transition duration-300 ease-in-out' : 'bg-blue-50 hover:scale-115 origin-left transition duration-300 ease-in-out'} rounded-full flex items-center justify-center cursor-pointer`}>
                <span className={`${isStudent ? 'text-white' : 'text-blue-950'} text-xl`}>JD</span>
              </div>
            </button>

            {isProfileOpen && (
              <div className={`absolute right-0 mt-2 w-56 ${isStudent ? 'bg-blue-500' : 'bg-blue-700'} rounded-lg shadow-lg py-2 text-white`}>
                <div className={`px-4 py-2 border-b ${isStudent ? 'border-blue-400' : 'border-blue-300'}`}>
                  <p className="font-medium">John Doe</p>
                  <p className={`text-sm ${isStudent ? 'text-blue-200' : 'text-blue-200'}`}>john.doe@example.com</p>
                </div>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className={`w-full text-left px-4 py-2 ${isStudent ? 'hover:bg-blue-400' : 'hover:bg-blue-500'} transition-colors duration-200`}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar