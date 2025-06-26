import React, { useState } from 'react'
import Layout from '../Layout'
import Assessment from './Assessment'
import AssignmentList from './AssignmentList'
import PerformanceView from './PerformanceView'
import TeacherCalendar from './TeacherCalendar'
import CourseDetail from './CourseDetail'

const TeacherInterface = ({ onSignOut }) => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Mock courses data
  const courses = [
    {
      id: 1,
      name: 'Introduction to Programming',
      description: 'Learn the basics of programming with Python',
      documentCount: 3,
    },
    {
      id: 2,
      name: 'Data Structures',
      description: 'Advanced concepts in data structures and algorithms',
      documentCount: 5,
    },
    {
      id: 3,
      name: 'Web Development',
      description: 'Learn HTML, CSS, and JavaScript for web development',
      documentCount: 4,
    },
  ]

  // Mock course details
  const courseDetails = {
    1: {
      id: 1,
      name: 'Introduction to Programming',
      description: 'Learn the basics of programming with Python. This course covers fundamental programming concepts, data types, control structures, and basic algorithms.',
      documents: [
        { id: 1, name: 'Course Syllabus.pdf', type: 'pdf', uploadDate: '2024-03-15' },
        { id: 2, name: 'Week 1 Lecture Notes.pdf', type: 'pdf', uploadDate: '2024-03-16' },
        { id: 3, name: 'Programming Exercises.docx', type: 'doc', uploadDate: '2024-03-17' },
      ],
    },
    2: {
      id: 2,
      name: 'Data Structures',
      description: 'Advanced concepts in data structures and algorithms. Learn about arrays, linked lists, trees, graphs, and various sorting and searching algorithms.',
      documents: [
        { id: 1, name: 'Course Overview.pdf', type: 'pdf', uploadDate: '2024-03-10' },
        { id: 2, name: 'Data Structures Introduction.pdf', type: 'pdf', uploadDate: '2024-03-11' },
        { id: 3, name: 'Algorithm Analysis.pdf', type: 'pdf', uploadDate: '2024-03-12' },
        { id: 4, name: 'Practice Problems.docx', type: 'doc', uploadDate: '2024-03-13' },
        { id: 5, name: 'Midterm Review.pdf', type: 'pdf', uploadDate: '2024-03-14' },
      ],
    },
    3: {
      id: 3,
      name: 'Web Development',
      description: 'Learn HTML, CSS, and JavaScript for web development. Build responsive and interactive websites from scratch.',
      documents: [
        { id: 1, name: 'HTML Basics.pdf', type: 'pdf', uploadDate: '2024-03-05' },
        { id: 2, name: 'CSS Styling.pdf', type: 'pdf', uploadDate: '2024-03-06' },
        { id: 3, name: 'JavaScript Fundamentals.pdf', type: 'pdf', uploadDate: '2024-03-07' },
        { id: 4, name: 'Project Guidelines.docx', type: 'doc', uploadDate: '2024-03-08' },
      ],
    },
  }

  const handleNavigate = (section, courseId = null) => {
    setActiveSection(section)
    if (courseId) {
      setSelectedCourse(courseId)
    }
  }

  const handleCourseClick = (courseId) => {
    handleNavigate('courseDetail', courseId)
  }

  const handleBackToCourses = () => {
    handleNavigate('courses')
  }

  const handleViewPerformance = (courseId) => {
    handleNavigate('performance', courseId)
  }

  const handleGenerateAssignment = (courseId) => {
    handleNavigate('assessment', courseId)
  }

  // Render the dashboard section
  const renderDashboard = () => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-yellow-300">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 ">Total Students</h3>
          <p className=" text-4xl font-bold transform group-hover:scale-150 origin-left transition duration-300 ease-in-out">150</p>
        </div>
        <div className="group bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Active Courses</h3>
          <p className="text-4xl font-bold transform group-hover:scale-150 origin-left transition duration-300 ease-in-out">8</p>
        </div>
        <div className="group bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Assignments</h3>
          <p className="text-4xl font-bold transform group-hover:scale-150 origin-left transition duration-300 ease-in-out">24</p>
        </div>
        <div className="group bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Average Grade</h3>
          <p className="text-4xl font-bold transform group-hover:scale-120 origin-left transition duration-300 ease-in-out">85%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg- p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-medium">New course material uploaded</p>
                <p className="text-sm text-yellow-200">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Assignment graded</p>
                <p className="text-sm text-yellow-200">5 hours ago</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">New message from student</p>
                <p className="text-sm text-yellow-200">1 day ago</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className=" p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Tasks</h2>
          <ul className="space-y-4">
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Grade Math Assignment</p>
                <p className="text-sm text-yellow-200">Due tomorrow</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Faculty Meeting</p>
                <p className="text-sm text-yellow-200">Tomorrow at 2 PM</p>
              </div>
            </li>
            <li className="flex items-center p-3 bg-gray-500 rounded-md hover:scale-105 origin-left transition duration-300 ease-in-out">
              <div className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Prepare Science Lesson</p>
                <p className="text-sm text-yellow-200">Due in 3 days</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  // Render the courses section
  const renderCourses = () => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-50">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            className="bg-yellow-300 rounded-lg transition-transform duration-300 hover:scale-95 cursor-pointer"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {course.documentCount} document{course.documentCount !== 1 ? 's' : ''}
                </span>
                {/* <span className="text-blue-500 hover:text-blue-700">
                  View Details →
                </span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render the course detail section
  const renderCourseDetail = () => {
    if (!selectedCourse || !courseDetails[selectedCourse]) {
      return <div className="text-center text-red-500">Course not found</div>
    }

    return (
      <CourseDetail
        course={courseDetails[selectedCourse]}
        onBack={handleBackToCourses}
        onViewPerformance={() => handleViewPerformance(selectedCourse)}
        onGenerateAssignment={() => handleGenerateAssignment(selectedCourse)}
      />
    )
  }

  // Determine which section to render
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'courses':
        return renderCourses()
      case 'courseDetail':
        return renderCourseDetail()
      case 'performance':
        return <PerformanceView />
      case 'assessment':
        return renderAssessment()
      case 'assignments':
        return <AssignmentList />
      case 'calendar':
        return <TeacherCalendar />
      default:
        return renderDashboard()
    }
  }

  // Render the assessment section
  const renderAssessment = () => (
    <Assessment 
      courseId={selectedCourse} 
      onBack={() => handleNavigate('courseDetail')} 
    />
  )

  return (
    <Layout onSignOut={onSignOut} role="teacher" onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  )
}

export default TeacherInterface