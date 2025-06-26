import React, { useState, useEffect } from 'react';
import StudentPerformance from './StudentPerformance';
import AssignmentPerformance from './AssignmentPerformance';

const PerformanceView = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get the courseId from URL or props if available
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    if (courseId) {
      setSelectedCourse(courseId);
    }
  }, []);

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      assignments: [
        { id: 1, title: 'Variables and Data Types Quiz' },
        { id: 2, title: 'Control Structures Assessment' },
      ],
      students: [
        { id: 1, name: 'John Doe', rollNumber: 'CS001' },
        { id: 2, name: 'Jane Smith', rollNumber: 'CS002' },
        { id: 3, name: 'Bob Wilson', rollNumber: 'CS003' },
      ],
    },
    {
      id: 2,
      title: 'Data Structures',
      assignments: [
        { id: 1, title: 'Arrays and Lists Quiz' },
        { id: 2, title: 'Trees and Graphs Assignment' }
      ],
      students: [
        { id: 1, name: 'Frank Miller', rollNumber: 'CS2306' },
        { id: 2, name: 'Grace Lee', rollNumber: 'CS2307' },
        { id: 3, name: 'Henry Taylor', rollNumber: 'CS2308' }
      ]
    },
    {
      id: 3,
      title: 'Web Development',
      assignments: [
        { id: 1, title: 'HTML & CSS Basics' },
        { id: 2, title: 'JavaScript Fundamentals' },
        { id: 3, title: 'React Components' }
      ],
      students: [
        { id: 1, name: 'Ivy Chen', rollNumber: 'CS2309' },
        { id: 2, name: 'Jack Wilson', rollNumber: 'CS2310' },
        { id: 3, name: 'Kelly Martinez', rollNumber: 'CS2311' }
      ]
    }
  ];

  // Filter students based on search query
  const filterStudents = (students) => {
    if (!searchQuery) return students;
    const query = searchQuery.toLowerCase();
    return students.filter(
      student =>
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query)
    );
  };

  if (selectedStudent) {
    return (
      <StudentPerformance
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  if (selectedAssignment) {
    return (
      <AssignmentPerformance
        assignment={selectedAssignment}
        onBack={() => setSelectedAssignment(null)}
      />
    );
  }

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    const filteredStudents = filterStudents(course.students);

    return (
      <div className="space-y-8 bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Course Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-50">{course.title}</h1>
            <br />
            <p className="text-gray-50 text-xl" >Performance Overview</p>
          </div>
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-yellow-300 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Courses
          </button>
        </div>

        {/* Assignments Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 mb-4 ">Assignments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {course.assignments.map(assignment => (
              <div
                key={assignment.id}
                className="bg-yellow-300 rounded-lg shadow-xl p-4 hover:shadow-yellow-50 transition-color cursor-pointer"
                onClick={() => setSelectedAssignment(assignment)}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {assignment.title}
                </h3>
                <button
                  className="text-blue-500 hover:text-blue-700 font-medium"
                  
                >
                  View Performance →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Students Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-50">Students</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 border text-yellow-300 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className="bg-yellow-300 rounded-lg shadow-xl p-4 hover:shadow-white transition-color cursor-pointer"
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {student.name}
                    </h3>
                    <p className="text-gray-600">{student.rollNumber}</p>
                  </div>
                  <div className="mt-4 flex justify-start">
                    <button
                      className="text-blue-500 hover:text-blue-700 font-medium"
                      
                    >
                      View Performance →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Course Selection View
  return (
    <div className="space-y-8 bg-gray-800 rounded-lg shadow-lg p-8"> 
      <h1 className="text-5xl font-bold text-yellow-300 flex justify-center">Select a Course</h1>
      <br />
      <div className="grid  md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div
            key={course.id}
            className="flex h-50 w-[350px] items-center justify-center bg-yellow-200 rounded-lg shadow-sm p-4 transition-transform duration-300 hover:scale-95"
            onClick={() => setSelectedCourse(course.id)}
          >
            <h2 className="text-3xl font-medium text-gray-800 mb-2">
              {course.title}
            </h2>
            {/* <button
              className="text-blue-500 hover:text-blue-700 font-medium"
              
            >
              View Course Performance →
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceView;
