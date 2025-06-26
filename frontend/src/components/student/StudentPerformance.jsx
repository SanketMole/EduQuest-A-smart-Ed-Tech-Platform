import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StudentPerformance = ({ student, courses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Chart options and data with dark theme
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb', // text-gray-200
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 with opacity
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
        },
      },
    },
  };

  const lineChartData = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    datasets: [
      {
        label: 'Score Progress',
        data: [85, 72, 90, 65, 88],
        borderColor: '#10b981', // text-emerald-500
        backgroundColor: '#059669', // text-emerald-600
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Quiz 3', 'Quiz 5', 'Quiz 2', 'Quiz 4'],
    datasets: [
      {
        data: [90, 88, 72, 65],
        backgroundColor: [
          '#10b981', // emerald-500
          '#3b82f6', // blue-500
          '#f59e0b', // amber-500
          '#ef4444', // red-500
        ],
      },
    ],
  };

  const renderCourseList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-black rounded-lg p-6 hover:bg-gradient-to-b from-gray-950 to-green-900 border border-white"
        >
          <h3 className="text-xl font-semibold text-gray-100 mb-4">{course.name}</h3>
          <p className="text-gray-400 mb-4">{course.description}</p>
          <button
            onClick={() => setSelectedCourse(course)}
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
          >
            View Performance
          </button>
        </div>
      ))}
    </div>
  );

  const renderPerformanceDetail = () => {
    const mockPerformance = {
      attemptedCount: 5,
      averageScore: 80,
      bestQuizzes: [
        { name: 'Quiz 3', score: 90 },
        { name: 'Quiz 5', score: 88 },
      ],
      worstQuizzes: [
        { name: 'Quiz 4', score: 65 },
        { name: 'Quiz 2', score: 72 },
      ],
      strengths: ['Problem Solving', 'Theoretical Concepts'],
      weaknesses: ['Time Management', 'Complex Algorithms'],
    };

    return (
      <div className="bg-gradient-to-tr from-blue-500 to-blue-400 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-sm hover:text-black border-2 border-white transition-all duration-200 hover:bg-green-500 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Courses
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">
            {selectedCourse.name} - Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Info */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Student Information</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-medium text-gray-200">Name:</span> {student.name}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-gray-200">Roll Number:</span> {student.rollNumber}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-gray-200">Assignments Attempted:</span>{' '}
                  {mockPerformance.attemptedCount}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium text-gray-200">Average Score:</span>{' '}
                  {mockPerformance.averageScore}%
                </p>
              </div>
            </div>

            {/* Best & Worst Performance */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Performance Highlights</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Best Performances</h4>
                  <div className="space-y-2">
                    {mockPerformance.bestQuizzes.map((quiz) => (
                      <div
                        key={quiz.name}
                        className="flex items-center justify-between bg-gray-800 p-2 rounded border border-gray-700"
                      >
                        <span className="text-gray-300">{quiz.name}</span>
                        <span className="text-emerald-400 font-medium">{quiz.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Areas for Improvement</h4>
                  <div className="space-y-2">
                    {mockPerformance.worstQuizzes.map((quiz) => (
                      <div
                        key={quiz.name}
                        className="flex items-center justify-between bg-gray-800 p-2 rounded border border-gray-700"
                      >
                        <span className="text-gray-300">{quiz.name}</span>
                        <span className="text-red-400 font-medium">{quiz.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-lg font-medium text-gray-100 mb-3">Strengths</h4>
              <ul className="list-disc list-inside space-y-2">
                {mockPerformance.strengths.map((strength) => (
                  <li key={strength} className="text-gray-300">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-lg font-medium text-gray-100 mb-3">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-2">
                {mockPerformance.weaknesses.map((weakness) => (
                  <li key={weakness} className="text-gray-300">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-gray-100 mb-4">Score Progress</h4>
            <Line data={lineChartData} options={chartOptions} />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-gray-100 mb-4">Performance Distribution</h4>
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Performance Overview</h1>
      {selectedCourse ? renderPerformanceDetail() : renderCourseList()}
    </div>
  );
};

export default StudentPerformance;
