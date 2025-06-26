import React, { useState } from 'react'
import AIQuizGenerator from './AIQuizGenerator'

const Assessment = ({ courseId, onBack }) => {
  const [assessmentType, setAssessmentType] = useState('quiz')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [questions, setQuestions] = useState([
    { id: 1, text: '', type: 'multiple-choice', options: ['', '', '', ''], correctAnswer: 0 }
  ])
  const [showAIGenerator, setShowAIGenerator] = useState(false)

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { 
        id: questions.length + 1, 
        text: '', 
        type: 'multiple-choice', 
        options: ['', '', '', ''], 
        correctAnswer: 0 
      }
    ])
  }

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ))
  }

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options]
        newOptions[optionIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the assessment data to your backend
    console.log({
      courseId,
      assessmentType,
      title,
      description,
      dueDate,
      questions
    })
    // For now, just go back to the previous screen
    if (onBack) onBack()
  }

  const handleAIGeneratedQuiz = (quizData) => {
    setTitle(quizData.title)
    setDescription(quizData.description)
    setQuestions(quizData.questions.map(q => ({
      id: q.questionNumber,
      text: q.questionText,
      type: 'multiple-choice',
      options: q.options,
      correctAnswer: q.correctAnswer
    })))
    setShowAIGenerator(false)
  }

  if (showAIGenerator) {
    return (
      <AIQuizGenerator
        courseId={courseId}
        courseName={title || 'Untitled Course'}
        onBack={() => setShowAIGenerator(false)}
        onSave={handleAIGeneratedQuiz}
      />
    )
  }

  return (
    <div className="bg-blue-300 rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Generate Assignment</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-yellow-300 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 hover:text-black"
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2 text-2xl">
            Assessment Type
          </label>
          <select
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value)}
            className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="exam">Exam</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-2xl font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-2xl font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className=" block text-gray-700 text-2xl font-bold mb-2">
            Due Date
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-800">Questions</h2>
            <div className="space-x-4">
              {assessmentType === 'quiz' && (
                <button
                  type="button"
                  onClick={() => setShowAIGenerator(true)}
                  className="text-white px-4 py-2 rounded-md bg-gradient-to-b from-green-950 to-green-700 transition-transform duration-300 hover:scale-95"
                >
                  Generate with AI
                </button>
              )}
              <button
                type="button"
                onClick={handleAddQuestion}
                className=" text-white px-4 py-2 rounded-md bg-gradient-to-b from-blue-950 to-blue-700 transition-transform duration-300 hover:scale-95"
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white border border-gray-800 rounded-lg p-4">
                <div className="mb-4">
                  <label className="block text-gray-900 text-md font-bold mb-2">
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                    className="bg-blue-200 w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => handleQuestionChange(question.id, 'correctAnswer', optionIndex)}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                        className="bg-blue-200 flex-1 px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${optionIndex + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-800 text-white border border-gray-800 rounded-md hover:text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-b from-blue-950 to-blue-700 text-white rounded-md cursor-pointer"
          >
            Create Assessment
          </button>
        </div>
      </form>
    </div>
  )
}

export default Assessment