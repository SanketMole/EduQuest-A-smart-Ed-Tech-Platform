import React, { useState } from 'react';
import EditAssignment from './EditAssignment';

const AssignmentList = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      topic: "Python Basics - Variables and Data Types",
      createdAt: "2025-04-08T14:30:00",
      questions: [
        {
          id: 1,
          text: "What is the difference between a list and a tuple in Python?",
          options: [
            "Lists are mutable, tuples are immutable",
            "Lists use () brackets, tuples use []",
            "Lists can only store numbers",
            "Tuples can be modified after creation"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "Which of the following is a valid variable name in Python?",
          options: [
            "1variable",
            "_variable",
            "variable-name",
            "class"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      topic: "Data Structures - Arrays and Linked Lists",
      createdAt: "2025-04-09T10:15:00",
      questions: [
        {
          id: 1,
          text: "What is the time complexity of inserting an element at the beginning of a linked list?",
          options: [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n²)"
          ],
          correctAnswer: 2
        },
        {
          id: 2,
          text: "Which data structure provides constant time access to elements using indices?",
          options: [
            "Linked List",
            "Array",
            "Stack",
            "Queue"
          ],
          correctAnswer: 1
        }
      ]
    }
  ]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleBack = () => {
    setSelectedAssignment(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedAssignment) => {
    setAssignments(assignments.map(a => 
      a.id === updatedAssignment.id ? updatedAssignment : a
    ));
    setSelectedAssignment(updatedAssignment);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing && selectedAssignment) {
    return (
      <EditAssignment
        assignment={selectedAssignment}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (selectedAssignment) {
    return (
      <div className="bg-yellow-300 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          
          <h1 className="text-3xl font-bold text-gray-800">{selectedAssignment.topic}</h1>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-yellow-300 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 hover:text-black"
          >
            ← Back to Assignments
          </button>
        </div>

        <div className="mb-4 text-gray-600">
          Created on: {formatDate(selectedAssignment.createdAt)}
        </div>

        <div className="space-y-6 mb-8">
          {selectedAssignment.questions.map((question, index) => (
            <div key={question.id} className="bg-yellow-200 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Question {index + 1}
              </h3>
              <p className="text-gray-700 mb-4">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div 
                    key={optIndex}
                    className={`p-3 rounded-lg ${
                      question.correctAnswer === optIndex 
                        ? 'bg-green-100 border border-green-200' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="mr-2 text-gray-500">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    <span className={question.correctAnswer === optIndex ? 'text-green-700' : 'text-gray-700'}>
                      {option}
                    </span>
                    {question.correctAnswer === optIndex && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEdit}
            className="px-6 py-2 border-2 border-black bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit Assignment
          </button>
          <button
            className="px-6 py-2 border-2 border-black bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Publish Assignment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-yellow-300 mb-6">My Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map(assignment => (
          <div
            key={assignment.id}
            onClick={() => handleAssignmentClick(assignment)}
            className="bg-yellow-200 border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {assignment.topic}
            </h2>
            <div className="flex items-center text-gray-600">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span>{formatDate(assignment.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;
