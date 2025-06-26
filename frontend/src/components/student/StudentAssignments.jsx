import React from 'react';

const StudentAssignments = ({ courses, onNavigateToPerformance }) => {
  // Get all completed assignments across all courses
  const completedAssignments = courses.flatMap(course => 
    course.assignments
      .filter(assignment => assignment.completed)
      .map(assignment => ({
        ...assignment,
        courseName: course.name,
        courseId: course.id
      }))
  ).sort((a, b) => b.score - a.score); // Sort by score descending

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-500">My Assignments</h1>
        <button
          onClick={onNavigateToPerformance}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          View Performance
        </button>
      </div>

      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="group bg-black rounded-lg shadow-lg p-6 ">
          <h3 className="text-xl font-semibold text-gray-50 mb-2">Total Completed</h3>
          <p className="text-3xl font-bold text-blue-600 transform group-hover:scale-180 origin-left transition duration-300 ease-in-out">{completedAssignments.length}</p>
        </div>
        <div className="group bg-black rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-50 mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-green-600 transform group-hover:scale-180 origin-left transition duration-300 ease-in-out">
            {Math.round(
              completedAssignments.reduce((sum, assignment) => sum + assignment.score, 0) / 
              completedAssignments.length
            )}%
          </p>
        </div>
        <div className="group bg-black rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-50 mb-2">Best Score</h3>
          <p className="text-3xl font-bold text-purple-600 transform group-hover:scale-140 origin-left transition duration-300 ease-in-out">
            {completedAssignments.length > 0 ? `${completedAssignments[0].score}%` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedAssignments.map((assignment) => (
          <div
            key={`${assignment.courseId}-${assignment.id}`}
            className="bg-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 origin-center transition duration-300 ease-in-out"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-50 mb-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-blue-500">{assignment.courseName}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  assignment.score >= 90 ? 'bg-green-100 text-green-800' :
                  assignment.score >= 75 ? 'bg-blue-100 text-blue-800' :
                  assignment.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {assignment.score}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    assignment.score >= 90 ? 'bg-green-500' :
                    assignment.score >= 75 ? 'bg-blue-500' :
                    assignment.score >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${assignment.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {completedAssignments.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments completed</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by completing your first assignment.</p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
