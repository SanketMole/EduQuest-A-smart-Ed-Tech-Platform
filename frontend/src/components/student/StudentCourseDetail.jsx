import React, { useState } from 'react';
import AssignmentAttempt from './AssignmentAttempt';

const StudentCourseDetail = ({ course, onBack }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentScores, setAssignmentScores] = useState(
    course.assignments.reduce((acc, curr) => {
      if (curr.attempted && curr.score !== undefined) {
        acc[curr.id] = curr.score;
      }
      return acc;
    }, {})
  );
  const [attemptedAssignments, setAttemptedAssignments] = useState(
    new Set(course.assignments.filter(a => a.attempted).map(a => a.id))
  );

  const handleAttemptAssignment = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleAssignmentSubmit = (result) => {
    const { score } = result;
    
    // Update scores and attempted status
    setAssignmentScores(prev => ({
      ...prev,
      [selectedAssignment.id]: score
    }));
    setAttemptedAssignments(prev => new Set([...prev, selectedAssignment.id]));
    
    // Close the assignment modal
    setSelectedAssignment(null);
  };

  const handleViewDocument = (documentId) => {
    // TODO: Implement document view functionality
    console.log('Viewing document:', documentId);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:text-black border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 cursor-pointer"
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

        <div className="bg-gray-950 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{course.name}</h1>
            <p className="text-blue-200">{course.description}</p>
            <div className="mt-2 text-blue-300">Instructor: {course.instructor}</div>
          </div>

          {/* Course Documents Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Course Documents</h2>
            <div className="bg-blue-300 rounded-lg overflow-hidden">
              {course.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border-b border-black last:border-b-0 hover:bg-blue-400 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <div className="text-gray-700 font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        Uploaded: {doc.uploadDate}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDocument(doc.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Section */}
          <div>
            <h2 className="text-xl font-semibold text-white  mb-4">Assignments</h2>
            <div className="bg-blue-300 rounded-lg overflow-hidden">
              {course.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border-b border-black last:border-b-0 hover:bg-blue-400 transition-colors"
                >
                  <div>
                    <div className="text-gray-700 font-medium">
                      {assignment.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {assignment.dueDate}
                    </div>
                    {attemptedAssignments.has(assignment.id) && (
                      <div className="text-sm font-medium mt-1">
                        <span className={`${
                          assignmentScores[assignment.id] >= 70 
                            ? 'text-green-600' 
                            : assignmentScores[assignment.id] >= 40 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                        }`}>
                          Score: {assignmentScores[assignment.id]}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => handleAttemptAssignment(assignment)}
                      disabled={attemptedAssignments.has(assignment.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        attemptedAssignments.has(assignment.id)
                          ? 'bg-gray-500 text-white cursor-no-drop'
                          : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                      }`}
                    >
                      {attemptedAssignments.has(assignment.id) ? 'Already Attempted' : 'Attempt'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Attempt Modal */}
      {selectedAssignment && (
        <AssignmentAttempt
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onSubmit={handleAssignmentSubmit}
        />
      )}
    </>
  );
};

export default StudentCourseDetail;
