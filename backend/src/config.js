import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export configuration constants
export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  port: process.env.PORT || 4000
};

// Validate required environment variables
if (!config.geminiApiKey) {
  console.error('❌ ERROR: GEMINI_API_KEY is not defined in .env file');
  console.error('Please create a .env file and add your Gemini API key');
  console.error('Get your key from: https://aistudio.google.com/app/apikey');
  process.exit(1);
}
