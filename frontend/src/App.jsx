import React, { useState } from 'react'
import TeacherInterface from './components/teacher/TeacherInterface'
import StudentInterface from './components/student/StudentInterface'

function App() {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const handleSignOut = () => {
    setSelectedRole(null)
  }

  if (selectedRole === 'teacher') {
    return <TeacherInterface onSignOut={handleSignOut} role="teacher"/>
  }

  if (selectedRole === 'student') {
    return <StudentInterface onSignOut={handleSignOut} role="student"/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-white">EduQuest</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Teacher Container */}
          <div 
            onClick={() => handleRoleSelect('teacher')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">Teacher</h2>
            <p className="text-gray-600 text-center">
              Access your teaching dashboard, manage courses, and track student progress.
            </p>
          </div>

          {/* Student Container */}
          <div 
            onClick={() => handleRoleSelect('student')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">Student</h2>
            <p className="text-gray-600 text-center">
              Access your learning materials, take quizzes, and track your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default App
