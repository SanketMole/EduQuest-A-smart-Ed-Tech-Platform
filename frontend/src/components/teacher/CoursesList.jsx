// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const CoursesList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // TODO: Replace with actual API call
//     const fetchCourses = async () => {
//       try {
//         // Simulated API call
//         const mockCourses = [
//           {
//             id: 1,
//             name: 'Introduction to Programming',
//             description: 'Learn the basics of programming with Python',
//             documentCount: 3,
//           },
//           {
//             id: 2,
//             name: 'Data Structures',
//             description: 'Advanced concepts in data structures and algorithms',
//             documentCount: 5,
//           },
//           // Add more mock courses as needed
//         ];
        
//         setCourses(mockCourses);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-2xl font-bold mb-6">My Courses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <Link
//             key={course.id}
//             to={`/courses/${course.id}`}
//             className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
//           >
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
//               <p className="text-gray-600 mb-4">{course.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-500">
//                   {course.documentCount} document{course.documentCount !== 1 ? 's' : ''}
//                 </span>
//                 <span className="text-blue-500 hover:text-blue-700">
//                   View Details →
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesList; 