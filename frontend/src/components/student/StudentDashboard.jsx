import React from 'react';

const StudentDashboard = ({ student, courses }) => {
  // Calculate stats
  const totalAssignments = courses.reduce((total, course) => 
    total + course.assignments.length, 0
  );
  
  const completedAssignments = courses.reduce((total, course) => 
    total + course.assignments.filter(a => a.completed).length, 0
  );

  const averageScore = courses.reduce((total, course) => {
    const courseScores = course.assignments
      .filter(a => a.completed && a.score)
      .map(a => a.score);
    return total + (courseScores.reduce((sum, score) => sum + score, 0) / courseScores.length || 0);
  }, 0) / courses.length;

  const averageProgress = courses.reduce((total, course) => 
    total + course.progress, 0
  ) / courses.length;

  // Get time of day for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="p-6 bg-gray-800">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-gray-950 to-blue-900 rounded-xl p-8 mb-6 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          {greeting}, {student.name}!
        </h1>
        <p className="text-blue-100">
          Roll Number: {student.rollNumber} | {student.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Enrolled Courses */}
        <div className="bg-black rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Enrolled Courses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{courses.length}</p>
        </div>

        {/* Assignments Progress */}
        <div className="bg-black rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Assignments</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {completedAssignments}/{totalAssignments}
          </p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 rounded-full h-2"
                style={{ width: `${(completedAssignments / totalAssignments) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-black rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {averageScore.toFixed(1)}%
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-black rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{averageProgress.toFixed(1)}%</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 rounded-full h-2"
                style={{ width: `${averageProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {courses.flatMap(course => 
            course.assignments
              .filter(a => a.completed)
              .map(assignment => ({
                course: course.name,
                assignment: assignment.title,
                score: assignment.score
              }))
          ).slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 to-blue-500 rounded-lg">
              <div>
                <h3 className="font-semibold text-white">{activity.assignment}</h3>
                <p className="text-sm text-black">{activity.course}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                activity.score >= 90 ? 'bg-green-800 text-green-100' :
                activity.score >= 75 ? 'bg-blue-800 text-blue-100' :
                activity.score >= 60 ? 'bg-yellow-800 text-yellow-100' :
                'bg-red-800 text-red-100'
              }`}>
                {activity.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
