import React, { useState, useRef } from 'react';

const CourseDetail = ({ course, onBack, onViewPerformance, onGenerateAssignment }) => {
  const [documents, setDocuments] = useState(course?.documents || []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // Filter for allowed file types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain'
    ];

    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'].includes(extension);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were not added. Only PDF, DOC, DOCX, PPT, PPTX, and TXT files are allowed.');
    }

    const newDocuments = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toLocaleDateString(),
      file: file
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    // TODO: Implement actual file upload to backend
    console.log('Files to upload:', newDocuments);
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    // TODO: Implement actual deletion from backend
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-300 text-black rounded-lg shadow-sm hover:text-black border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 cursor-pointer"
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

      <div className="bg-blue-300 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course?.name || 'Course Name'}</h1>
          <p className="text-gray-600">{course?.description}</p>
        </div>

        {/* Course Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Description</h2>
          <p className="text-gray-600">{course?.description}</p>
        </div>

        {/* Upload Button - Always Visible */}
        <div className="mb-6">
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg text-lg font-medium"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Upload Course Documents
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          />
        </div>

        {/* Course Documents */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-8 h-8 text-white"
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
                    <div className="font-medium text-gray-50">{doc.name}</div>
                    <div className="text-sm text-gray-50">
                      {formatFileSize(doc.size)} • Uploaded: {doc.uploadDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => window.open(URL.createObjectURL(doc.file))}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No documents uploaded yet. Click the upload button above to add course materials.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onViewPerformance}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gradient-to-b from-blue-950 to-blue-700  transition-transform duration-300 hover:scale-95 cursor-pointer"
          >
            View Performance
          </button>
          <button
            onClick={onGenerateAssignment}
            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gradient-to-b from-green-950 to-green-700 transition-transform duration-300 hover:scale-95 cursor-pointer"
          >
            Generate Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;