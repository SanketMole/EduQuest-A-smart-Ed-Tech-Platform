import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const StudentPerformance = ({ student, onBack }) => {
  // Mock data - this would come from your backend in real implementation
  const [studentData] = useState({
    studentName: student.name,
    rollNumber: student.rollNumber,
    courseName: "Introduction to Programming",
    testResults: [
      { topic: "Variables and Data Types", score: 85 },
      { topic: "Control Structures", score: 92 },
      { topic: "Functions", score: 78 },
      { topic: "Object-Oriented Programming", score: 65 },
      { topic: "Error Handling", score: 88 }
    ]
  });

  const strongAreas = studentData.testResults
    .filter(test => test.score >= 75)
    .map(test => test.topic);

  const improvementAreas = studentData.testResults
    .filter(test => test.score < 75)
    .map(test => test.topic);

  const chartData = studentData.testResults.map(test => ({
    name: test.topic,
    score: test.score
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const averageScore = Math.round(
    studentData.testResults.reduce((acc, curr) => acc + curr.score, 0) / studentData.testResults.length
  );

  return (
    <div className="bg-black text-white rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Student Performance</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-100"
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
          Back to Students
        </button>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-1">Student Name</h3>
          <p className="text-lg">{studentData.studentName}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-1">Roll Number</h3>
          <p className="text-lg">{studentData.rollNumber}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-1">Average Score</h3>
          <p className="text-lg">{averageScore}%</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Details */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Details</h2>
          <div className="space-y-3">
            {studentData.testResults.map((test, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center bg-gray-700 p-3 rounded"
              >
                <span>{test.topic}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  test.score >= 75 ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {test.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
          <LineChart width={400} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
          </LineChart>
        </div>

        {/* Analysis */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Strengths & Improvements</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400 mb-2">Strong Areas:</h3>
              <div className="flex flex-wrap gap-2">
                {strongAreas.map((area, index) => (
                  <span 
                    key={index}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 mb-2">Areas for Improvement:</h3>
              <div className="flex flex-wrap gap-2">
                {improvementAreas.map((area, index) => (
                  <span 
                    key={index}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie 
                data={chartData} 
                dataKey="score" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">AI-Generated Feedback</h2>
        <p className="text-gray-300 leading-relaxed">
          {studentData.studentName} demonstrates strong proficiency in {strongAreas.join(', ')}. 
          {improvementAreas.length > 0 
            ? ` To enhance overall performance, focus on strengthening understanding in ${improvementAreas.join(', ')}.`
            : ' Excellent work across all areas!'
          }
          {averageScore >= 85 
            ? ' Overall performance is exceptional.'
            : averageScore >= 75 
              ? ' Overall performance is good, with room for improvement.'
              : ' Dedicated practice in weak areas will help improve overall performance.'
          }
        </p>
      </div>
    </div>
  );
};

export default StudentPerformance;
