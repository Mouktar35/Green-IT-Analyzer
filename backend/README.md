# GreenIT Code Analyzer - Backend

Backend API for analyzing code snippets using Gemini 1.5 Flash to detect GreenIT issues.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
# Copy the example .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# Get your API key from: https://aistudio.google.com/app/apikey
```

Your `.env` file should look like:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=4000
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## 📡 API Endpoints

### POST /api/analyze
Analyzes code for GreenIT issues.

**Request:**
```json
{
  "code": "your code snippet here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "issues": [
      {
        "type": "I/O in Loop",
        "line": "for loop with database query",
        "impact": "Multiple database connections waste CPU and network",
        "suggestion": "Fetch all data in one query before the loop"
      }
    ],
    "ecoScore": 65,
    "summary": "Moderate issues detected. Optimize I/O operations."
  }
}
```

### GET /health
Health check endpoint.

## 🧪 Testing with cURL

### Test 1: Bad Code (I/O in Loop)
```bash
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"code\": \"for (let i = 0; i < users.length; i++) { const user = await db.query('SELECT * FROM users WHERE id = ?', [i]); console.log(user); }\"}"
```

### Test 2: Bad Code (String Concatenation)
```bash
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"code\": \"let result = ''; for (let i = 0; i < 1000; i++) { result = result + i.toString(); }\"}"
```

### Test 3: Good Code
```bash
curl -X POST http://localhost:4000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"code\": \"const users = await db.query('SELECT * FROM users'); users.forEach(user => console.log(user));\"}"
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app initialization
│   ├── config.js           # Environment configuration
│   ├── routes/
│   │   └── analyze.js      # POST /api/analyze route
│   └── services/
│       └── geminiService.js # Gemini AI integration
├── package.json
├── .env                     # Your environment variables (not in git)
├── .env.example            # Example environment variables
└── README.md
```

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Gemini 1.5 Flash** - AI code analysis
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🌿 GreenIT Detection

The analyzer detects 3 main issues:

1. **I/O Operations in Loops** - Database queries, file reads, API calls inside loops
2. **Bad String Concatenation** - Using `+` in loops instead of efficient methods
3. **Exception Misuse** - Using exceptions for control flow

## 📝 Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## 🔑 Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env` file
