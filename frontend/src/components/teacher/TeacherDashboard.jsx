import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const TeacherDashboard = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('courses');

  const menuItems = [
    { id: 'courses', label: 'Courses' },
    { id: 'performance', label: 'Performance Analysis' },
    { id: 'assignments', label: 'Generate Assignment' },
  ];

  // Update active section based on current path
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('performance')) {
      setActiveSection('performance');
    } else if (path.includes('assignments')) {
      setActiveSection('assignments');
    } else {
      setActiveSection('courses');
    }
  }, [location]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                activeSection === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherDashboard; 