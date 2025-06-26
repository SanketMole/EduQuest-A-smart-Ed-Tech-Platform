import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children, onSignOut, onNavigate, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    console.log('Toggling sidebar:', !isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isStudent = role === 'student'
  // console.log(isStudent);
  

  return (
    <div className={`min-h-screen ${isStudent ? 'bg-gray-800' : 'bg-blue-950'}`}>
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
        onSignOut={onSignOut}
        role={role}
      />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={onNavigate}
        role={role}
      />
      <main className={`pt-20 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout