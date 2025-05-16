
# Flask Backend for AI Interview Application

This directory contains a Flask backend that handles OpenAI API calls securely.

## Setup Instructions

1. Create a Python virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set your OpenAI API key as an environment variable:
   - Windows: `set OPENAI_API_KEY=your-api-key-here` 
    
   - macOS/Linux: `export OPENAI_API_KEY=your-api-key-here`

5. Run the Flask server:
   ```
   python app.py
   ```

## API Endpoints

The backend exposes the following endpoints:

- `GET /api/health` - Health check endpoint
- `POST /api/transcribe` - Transcribes audio to text using OpenAI Whisper
- `POST /api/generate-response` - Generates AI responses using OpenAI GPT
- `POST /api/text-to-speech` - Converts text to speech using OpenAI TTS

## Security Considerations

- API keys are stored securely on the server and never exposed to the client
- Input validation is performed on all requests
- CORS is configured to only allow requests from your React application
