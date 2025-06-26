import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';


const AIQuizGenerator = ({ courseId, courseName, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    topic: '',
    courseDescription: ''
  });
  const [enhancedTopic, setEnhancedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [mcqs, setMcqs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMcqs(null);

    try {
      const response = await axios.post('http://localhost:5000/api/quiz/enhance-topic', formData);
      setEnhancedTopic(response.data.enhancedTopic);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while enhancing the topic');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMCQs = async () => {
    setGenerating(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/quiz/generate-mcqs', {
        enhancedTopic,
        difficulty
      });
      setMcqs(response.data.mcqs);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while generating MCQs');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveQuiz = () => {
    if (mcqs && onSave) {
      onSave({
        courseId,
        courseName,
        title: formData.topic,
        description: formData.courseDescription,
        questions: mcqs.map((q, index) => ({
          questionNumber: index + 1,
          questionText: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }))
      });
    }
  };

  const handleDownloadPDF = () => {
  if (!mcqs) return;

  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const leftMargin = 14;
  const rightMargin = 196; // 210 - 14
  let y = 20;

  doc.setFontSize(16);
  doc.text('AI-Generated Quiz', leftMargin, y);
  y += 10;

  doc.setFontSize(12);

  const wrapText = (text, maxWidth) => doc.splitTextToSize(text, maxWidth);

  const topicLines = wrapText(`Topic: ${formData.topic}`, 180);
  topicLines.forEach(line => {
    doc.text(line, leftMargin, y);
    y += 7;
  });

  const descLines = wrapText(`Course Description: ${formData.courseDescription}`, 180);
  descLines.forEach(line => {
    doc.text(line, leftMargin, y);
    y += 7;
  });

  doc.text(`Difficulty: ${difficulty}`, leftMargin, y);
  y += 10;

  mcqs.forEach((q, index) => {
    const questionLines = wrapText(`Q${index + 1}: ${q.question}`, 180);
    if (y + questionLines.length * 7 > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    questionLines.forEach(line => {
      doc.text(line, leftMargin, y);
      y += 7;
    });

    doc.setFont('helvetica', 'normal');
    q.options.forEach((opt, idx) => {
      const optionLines = wrapText(opt, 175);
      optionLines.forEach(line => {
        doc.text(line, leftMargin + 4, y);
        y += 7;
      });
    });

    const correctLines = wrapText(`Correct: ${q.correctAnswer.toUpperCase()}`, 175);
    correctLines.forEach(line => {
      doc.text(line, leftMargin + 4, y);
      y += 7;
    });

    const explanationLines = wrapText(`Explanation: ${q.explanation}`, 175);
    explanationLines.forEach(line => {
      doc.text(line, leftMargin + 4, y);
      y += 7;
    });

    y += 5;

    // New page if near end
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`${formData.topic.replace(/\s+/g, '_')}_quiz.pdf`);
};



  const handleDownloadQuiz = () => {
  if (!mcqs) return;

  const quizData = {
    title: formData.topic,
    description: formData.courseDescription,
    difficulty,
    questions: mcqs.map((q, index) => ({
      questionNumber: index + 1,
      questionText: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }))
  };

  const fileContent = JSON.stringify(quizData, null, 2); // Pretty JSON
  const blob = new Blob([fileContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${formData.topic.replace(/\s+/g, '_')}_quiz.json`; // e.g., Python_Basics_quiz.json
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  return (
    <div className="bg-blue-200 rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold text-gray-800">AI Quiz Generator</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-yellow-300 rounded-lg shadow-sm hover:shadow-md border-2 border-blue-500 transition-all duration-200 hover:bg-blue-50 hover:text-black"
        >
          ← Back
        </button>
        
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Course: {courseName}</h2>
        <p className="text-gray-700">Generate a quiz using AI for this course</p>
      </div>

      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Quiz Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter quiz topic"
                className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <br></br>
            
            <div className="form-group">
              <label className="block text-gray-700 text-2xl font-bold mb-2">
                Course Description
              </label>
              <textarea
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleChange}
                placeholder="Enter course description"
                className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <br />

            <button 
              type="submit" 
              className={`bg-gradient-to-b from-blue-950 to-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
              disabled={loading}
            >
              {loading ? 'Enhancing...' : 'Enhance Topic'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>

      {enhancedTopic && (
        <div className="card mt-4">
          <div className="card-content ">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 ">Enhanced Topic Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Easy Level */}
              <div className="bg-green-200 p-4 rounded-md border border-green-200">
                <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Easy Level
                </h3>
                <ul className="list-disc list-inside text-green-800 space-y-1 text-md">
                  {enhancedTopic.split('\n').filter(line => 
                    (line.toLowerCase().includes('basic') || 
                    line.toLowerCase().includes('easy') ||
                    line.toLowerCase().includes('fundamental') || 
                    line.toLowerCase().includes('simple') ||
                    line.toLowerCase().includes('introduction'))
                  ).map((point, idx) => (
                    <li key={idx}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medium Level */}
              <div className="bg-yellow-100 p-4 rounded-md border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Medium Level
                </h3>
                <ul className="list-disc list-inside text-yellow-800 space-y-1 text-md">
                  {enhancedTopic.split('\n').filter(line => 
                    (line.toLowerCase().includes('intermediate')   || 
                    line.toLowerCase().includes('moderate')    ||
                    line.toLowerCase().includes('introduction')) ||
                    // (!line.toLowerCase().includes('basic') &&
                    //  !line.toLowerCase().includes('fundamental') &&
                    //  !line.toLowerCase().includes('simple') &&
                    //  !line.toLowerCase().includes('introduction' &&
                     (!line.toLowerCase().includes('advanced') &&
                     !line.toLowerCase().includes('complex') &&
                     !line.toLowerCase().includes('expert') &&
                     !line.toLowerCase().includes('difficult')))
                    
                  .map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                {/* {enhancedTopic.split('\n').filter(line => 
      (line.toLowerCase().includes('intermediate') && 
       line.toLowerCase().includes('moderate') &&
       line.toLowerCase().includes('introduction' && 
        line.toLowerCase().includes('medium')
       )) 
    ).map((point, idx) => (
      <li key={idx}>
        <ReactMarkdown>{point}</ReactMarkdown>
      </li>
    ))} */}
                </ul>
              </div>

              {/* Hard Level */}
              <div className="bg-red-200 p-4 rounded-md border border-red-200">
                <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Hard Level
                </h3>
                <ul className="list-disc list-inside text-red-800 space-y-1 text-md">
                  {enhancedTopic.split('\n').filter(line => 
                    (line.toLowerCase().includes('advanced') || 
                    line.toLowerCase().includes('hard') ||
                    line.toLowerCase().includes('complex') || 
                    line.toLowerCase().includes('expert') ||
                    line.toLowerCase().includes('difficult'))
                  ).map((point, idx) => (
                    <li key={idx}>
                      {point}</li>
                  ))}
                </ul>
              </div>
            </div>
            <br />

            <div className="flex items-center space-x-4 mb-4">
              <div className=" flex-1">
                <label className="block text-gray-700 text-xl font-bold mb-2">
                  Quiz Difficulty
                </label>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-white w-full px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <button 
                onClick={handleGenerateMCQs} 
                className={`bg-gradient-to-b from-green-950 to-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors self-end ${generating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
                disabled={generating}
              >
                {generating ? 'Generating...' : 'Generate Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {mcqs && (
        <div className="card mt-4">
          <div className="card-content">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Generated Quiz</h2>
            <div className="space-y-6">
              {mcqs.map((mcq, index) => (
                <div key={index} className="bg-yellow-200 border border-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="text-gray-600 mb-4">{mcq.question}</p>
                  <div className="space-y-2">
                    {mcq.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center">
                        <span className="mr-2 text-gray-500">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className="text-gray-700">{option}</span>
                        {option.toLowerCase().startsWith(mcq.correctAnswer) && (
                          <span className="ml-2 text-green-500 text-2xl">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="font-semibold">Explanation:</span> {mcq.explanation}
                  </div>
                </div>
              ))}

              {/* <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={onBack}
                  className="px-6 py-2 bg-gray-800 text-white border border-gray-800 rounded-md hover:text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuiz}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Quiz
                </button>
              </div> */}

              {/* Additionaly Download button */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleDownloadQuiz}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Download Quiz (JSON)
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Download PDF
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-2 bg-gray-800 text-white border border-gray-800 rounded-md hover:text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuiz}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Quiz
                </button>
              </div>



            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuizGenerator; 