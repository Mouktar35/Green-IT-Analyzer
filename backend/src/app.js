import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import analyzeRouter from './routes/analyze.js';

// Initialize Express application
const app = express();

// Enable CORS for all origins
app.use(cors());

// Enable JSON body parsing
app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'GreenIT Analyzer Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api', analyzeRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log('🌿 ======================================');
  console.log('🌿 GreenIT Code Analyzer Backend');
  console.log('🌿 ======================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/analyze`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('🌿 ======================================');
});

export default app;
