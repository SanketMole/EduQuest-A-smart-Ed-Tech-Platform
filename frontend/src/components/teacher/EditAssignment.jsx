import React, { useState } from 'react';

const EditAssignment = ({ assignment, onSave, onCancel }) => {
  const [questions, setQuestions] = useState(assignment.questions);
  const [topic, setTopic] = useState(assignment.topic);

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleCorrectAnswerChange = (questionId, optionIndex) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
    ));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Math.max(...questions.map(q => q.id)) + 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const handleSave = () => {
    onSave({
      ...assignment,
      topic,
      questions
    });
  };

  return (
    <div className="bg-yellow-300 rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Edit Assignment</h1>
        <button
          onClick={handleAddQuestion}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors"
        >
          Add New Question
        </button>
      </div>
      <br />

      <div className="mb-6">
        <label className="block text-gray-700 text-2xl font-bold mb-2">
          Assignment Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-yellow-100 w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-yellow-200 border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800 text-xl">
                Question {index + 1}
              </h3>
              {questions.length > 1 && (
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="border-2 border-red-500 bg-red-200 rounded-sm p-2  text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              )}
            </div>

            <div className="mb-4">
              {/* <label className="block text-gray-700 text-md font-bold mb-2">
                Question Text
              </label> */}
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question text"
              />
            </div>

            <div className="space-y-3">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctAnswer === optIndex}
                    onChange={() => handleCorrectAnswerChange(question.id, optIndex)}
                    className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(question.id, optIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-800 border border-gray-50 rounded-lg text-gray-50 hover:bg-gray-50 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 border-2 border-gray-800 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditAssignment;
