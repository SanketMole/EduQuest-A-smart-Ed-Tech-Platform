import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentCourseDetail from './StudentCourseDetail';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulating API call
    const fetchCourses = async () => {
      try {
        // Replace with actual API endpoint
        // const response = await axios.get('/api/student/courses');
        // setCourses(response.data);
        
        // Mock data
        setCourses([
          {
            id: 1,
            name: 'Introduction to Programming',
            description: 'Learn the basics of programming with Python',
            instructor: 'Dr. John Doe',
            documents: [
              { id: 1, name: 'Python Basics.pdf', uploadDate: '2025-04-01' },
              { id: 2, name: 'Control Structures.pdf', uploadDate: '2025-04-02' }
            ],
            assignments: [
              { 
                id: 1, 
                title: 'Python Lists', 
                dueDate: '2025-04-15',
                attempted: false 
              },
              { 
                id: 2, 
                title: 'Control Structures Assessment', 
                dueDate: '2025-04-20',
                attempted: true 
              }
            ]
          },
          {
            id: 2,
            name: 'Data Structures',
            description: 'Understanding fundamental data structures',
            instructor: 'Prof. Jane Smith',
            documents: [
              { id: 3, name: 'Arrays and Lists.pdf', uploadDate: '2025-04-03' },
              { id: 4, name: 'Trees and Graphs.pdf', uploadDate: '2025-04-04' }
            ],
            assignments: [
              { 
                id: 3, 
                title: 'Array Operations Quiz', 
                dueDate: '2025-04-18',
                attempted: false 
              },
              { 
                id: 4, 
                title: 'Tree Traversal Assignment', 
                dueDate: '2025-04-25',
                attempted: false 
              }
            ]
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <StudentCourseDetail 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold  text-blue-50 mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-black rounded-lg shadow-lg overflow-hidden hover:bg-gradient-to-b from-gray-950 to-blue-900 duration-300 cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-2 ">
                {course.name}
              </h2>
              <p className="text-blue-300 mb-4">{course.description}</p>
              <div className="text-sm text-gray-300 ">
                Instructor: {course.instructor}
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-blue-500">
                  {course.documents.length} Documents
                </span>
                <span className="text-green-500">
                  {course.assignments.length} Assignments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
