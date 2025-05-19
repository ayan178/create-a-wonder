
"""
Flask backend for AI Interview Application
Main application entry point
"""

import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_migrate import Migrate

# Import models and database
from models.user import db
from models import *

# Import modules
from routes.transcription import transcription_routes
from routes.response_generation import response_routes
from routes.text_to_speech import tts_routes
from routes.auth import auth_routes

# Load environment variables from .env file (if available)
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 2592000  # 30 days

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Configure CORS to allow requests from any origin during development
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints for different endpoint groups
app.register_blueprint(auth_routes)
app.register_blueprint(transcription_routes)
app.register_blueprint(response_routes)
app.register_blueprint(tts_routes)

# Create tables on startup if they don't exist
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
