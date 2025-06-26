const express = require('express');
const router = express.Router();
const { enhanceTopic, generateMCQs } = require('../services/geminiService');

// Add error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

// Enhance topic based on course description
router.post('/enhance-topic', async (req, res, next) => {
  try {
    const { topic, courseDescription } = req.body;
    
    if (!topic || !courseDescription) {
      return res.status(400).json({
        success: false,
        message: 'Missing topic or course description'
      });
    }

    const enhancedTopic = await enhanceTopic(topic, courseDescription);
    res.json({ success: true, enhancedTopic });
  } catch (error) {
    next(error);
  }
});

// Generate MCQs based on enhanced topic
router.post('/generate-mcqs', async (req, res, next) => {
  try {
    const { enhancedTopic, difficulty } = req.body;
    
    if (!enhancedTopic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Missing enhanced topic or difficulty level'
      });
    }

    const result = await generateMCQs(enhancedTopic, difficulty);
    
    // Ensure we have questions before sending response
    if (!result || !result.questions || !Array.isArray(result.questions)) {
      throw new Error('Invalid question format received from service');
    }

    res.json({ 
      success: true, 
      mcqs: result.questions 
    });
  } catch (error) {
    next(error);
  }
});

// Add a test endpoint to verify server is running
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Apply error handling middleware
router.use(errorHandler);

module.exports = router; 