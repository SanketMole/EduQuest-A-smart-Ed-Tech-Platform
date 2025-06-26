import React, { useState, useEffect } from 'react';

const AssignmentAttempt = ({ assignment, onClose, onSubmit }) => {
  const [step, setStep] = useState('instructions'); // instructions, questions
  const [agreed, setAgreed] = useState(false);
  const [answers, setAnswers] = useState({});

  // Disable scrolling and keyboard shortcuts when in quiz mode
  useEffect(() => {
    if (step === 'questions') {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      // Prevent keyboard shortcuts
      const handleKeyDown = (e) => {
        // Prevent Alt+Tab, Alt+F4, Ctrl+W, etc.
        if (e.altKey || e.ctrlKey || e.metaKey) {
          e.preventDefault();
        }
        // Prevent F5 refresh
        if (e.key === 'F5') {
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Show warning when trying to leave the page
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [step]);

  const instructions = [
    "Read all questions carefully before attempting.",
    "You cannot go back to previous questions once submitted.",
    "Each question carries equal marks.",
    "Ensure you have a stable internet connection.",
    "Do not refresh the page during the test.",
    "Timer will start once you click 'Proceed'.",
    "Once you start the quiz, you cannot access any other part of the application until submission.",
    "Attempting to leave the quiz will result in automatic submission.",
  ];

  const mockQuestions = [
    {
      id: 1,
      question: "What will be the output of the following code: \n \npython \nmy_list = [1, 2, 3, 4, 5]\nprint(my_list[1:4])",
      options: ["[1, 2, 3]", "[2, 3, 4]", "[3, 4, 5]", "[1, 2, 3, 4, 5]"],
      correctAnswer: "[2, 3, 4]"
    },
    {
      id: 2,
      question: "Which method adds an element to the end of a list?",
      options: ["`insert()`", "`append()`", "`extend()`", "`add()`"],
      correctAnswer: "`append()`"
    },
    {
      id: 3,
      question: "What is the result of `[1, 2] + [3, 4]`?",
      options: ["[1, 2, 3, 4]", "[4, 6]", "[1, 2] + [3, 4]", "Error"],
      correctAnswer: "[1, 2, 3, 4]"
    },
    {
      id: 4,
      question: "How do you reverse a list in place?",
      options: ["`list.reverse()`", "`reversed(list)`", "`list[::-1]`", "`list.invert()`"],
      correctAnswer: "`list.reverse()`",
    },
    {
      id: 5,
      question: "What does `my_list.count(5)` return if `my_list = [1, 5, 2, 5, 3, 5]`?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "3"
    },
    {
      id: 6,
      question: "What will `my_list.index(3)` return given `my_list = [1, 2, 3, 4, 3]`?",
      options: ["2", "4", "[2,4]", "Error"],
      correctAnswer: "2"
    },
    {
      id: 7,
      question: "What is the result of `[x*2 for x in range(3)]`?",
      options: ["[0, 1, 2]", "[0, 2, 4]", "[1, 2, 3]", "[2, 4, 6]"],
      correctAnswer: "[0, 2, 4]"
    },
    {
      id: 8,
      question: "What does `del my_list[2]` do?",
      options: ["Adds an element at index 2", "Removes the element at index 2", "Changes the element at index 2", "Returns the element at index 2"],
      correctAnswer: "Removes the element at index 2"
    }, 
    {
      id: 9,
      question: "Given \n\n a = [1, 2, 3] \nb = a \nb.append(4) \n\n What is the value of `a`?",
      options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "[]"],
      correctAnswer: "[1, 2, 3, 4]"
    }, 
    {
      id: 10,
      question: "What is the most efficient way to create a list with 1000 elements all set to 0?",
      options: ["Using a loop and append", "Using list comprehension", "Using `[0] * 1000`", "Using `list(range(1000))`"], 
      correctAnswer: "Using `[0] * 1000`"
    }
  ];

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    // Calculate score
    const totalQuestions = mockQuestions.length;
    const correctAnswers = mockQuestions.filter(q => 
      answers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Submit answers and score
    onSubmit({ answers, score, totalQuestions, correctAnswers });
  };

  const renderInstructions = () => (
    <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
      <ul className="space-y-4 mb-8">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
              {index + 1}
            </span>
            <span className="text-gray-700">{instruction}</span>
          </li>
        ))}
      </ul>
      
      <div className="border-t pt-6">
        <label className="flex items-center space-x-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">
            I have read and agree to follow all the instructions
          </span>
        </label>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setStep('questions')}
            disabled={!agreed}
            className={`px-6 py-2 rounded-lg ${
              agreed
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="bg-gradient-to-t from-yellow-400 to-yellow-200 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {assignment.title}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Total Questions: {mockQuestions.length}
          </p>
          <p className="text-gray-600">
            Answered: {Object.keys(answers).length} of {mockQuestions.length}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {mockQuestions.map((q) => (
          <div key={q.id} className="border-b pb-6 last:border-b-0">
            <p className="text-lg font-medium text-gray-800 mb-4">
              {q.question}
            </p>
            <div className="grid gap-3">
              {q.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[q.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-black hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleOptionSelect(q.id, option)}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== mockQuestions.length}
          className={`px-6 py-2 rounded-lg ${
            Object.keys(answers).length === mockQuestions.length
              ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
        step === 'questions' 
          ? 'bg-gray-800' 
          : 'bg-gray-500 bg-opacity-50'
      }`}
      style={{ backdropFilter: step === 'questions' ? 'blur(10px)' : 'none' }}
    >
      <div className={`w-full max-h-[90vh] overflow-y-auto ${
        step === 'questions' ? 'max-w-4xl' : ''
      }`}>
        {step === 'instructions' ? renderInstructions() : renderQuestions()}
      </div>
    </div>
  );
};

export default AssignmentAttempt;
