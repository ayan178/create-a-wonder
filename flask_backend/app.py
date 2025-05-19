
"""
Flask backend for AI Interview Application
Main application entry point
"""

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Import modules
from routes.transcription import transcription_routes
from routes.response_generation import response_routes
from routes.text_to_speech import tts_routes
from routes.auth import auth_routes

# Load environment variables from .env file (if available)
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure CORS to allow requests from any origin during development
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints for different endpoint groups
app.register_blueprint(auth_routes)
app.register_blueprint(transcription_routes)
app.register_blueprint(response_routes)
app.register_blueprint(tts_routes)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
