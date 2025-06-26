import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const AssignmentPerformance = ({ assignment, onBack }) => {
  // Mock data - will be replaced with real data from backend
  const performanceData = {
    totalAttempts: 45,
    averageScore: 75.5,
    highestScore: 98,
    lowestScore: 35,
    medianScore: 76,
    completionRate: 92,
    averageTime: "25 minutes",
    scoreDistribution: {
      above80: 15,
      between40And80: 25,
      below40: 5
    }
  };

  // Calculate percentages for pie chart
  const total = performanceData.scoreDistribution.above80 + 
                performanceData.scoreDistribution.between40And80 + 
                performanceData.scoreDistribution.below40;

  const pieData = [
    { name: 'Above 80%', value: performanceData.scoreDistribution.above80, color: '#4ade80' },  // green
    { name: '41-80%', value: performanceData.scoreDistribution.between40And80, color: '#facc15' },     // yellow
    { name: 'Below 40%', value: performanceData.scoreDistribution.below40, color: '#ef4444' }   // red
  ];

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="bg-black text-white rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-white rounded-lg p-4">
          <h1 className="text-2xl font-bold text-gray-800">Assignment Performance</h1>
          <p className="text-gray-600 mt-1">{assignment?.title || 'Assignment Analysis'}</p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50"
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
          Back to Course
        </button>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Attempts" 
          value={performanceData.totalAttempts}
          subtitle="Students attempted"
        />
        <StatCard 
          title="Average Score" 
          value={`${performanceData.averageScore}%`}
          subtitle="Class average"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${performanceData.completionRate}%`}
          subtitle="Of enrolled students"
        />
        <StatCard 
          title="Average Time" 
          value={performanceData.averageTime}
          subtitle="Per submission"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Score Distribution</h2>
          <div className="flex flex-col items-center">
            <PieChart width={400} height={400}>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">
                    {entry.name}: {entry.value} students
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Range Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Score Analysis</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Highest Score:</span>
              <span className="font-semibold text-white">{performanceData.highestScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Median Score:</span>
              <span className="font-semibold text-white">{performanceData.medianScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lowest Score:</span>
              <span className="font-semibold text-white">{performanceData.lowestScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPerformance;
