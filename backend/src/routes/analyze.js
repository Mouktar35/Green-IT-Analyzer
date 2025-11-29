import express from 'express';
import { analyzeCodeWithGemini } from '../services/geminiService.js';

const router = express.Router();

/**
 * POST /api/analyze
 * Analyzes code snippet for GreenIT issues
 */
router.post('/analyze', async (req, res) => {
  try {
    // Extract code from request body
    const { code } = req.body;

    // Validate input
    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: code'
      });
    }

    if (typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Code must be a string'
      });
    }

    if (code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Code cannot be empty'
      });
    }

    if (code.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Code snippet too large (max 10000 characters)'
      });
    }

    // Call Gemini service to analyze the code
    const analysisResult = await analyzeCodeWithGemini(code);

    // Return successful response
    res.json({
      success: true,
      data: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error.message);
    
    // Return error response
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze code'
    });
  }
});

export default router;
