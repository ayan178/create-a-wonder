
"""
Audio transcription routes
"""

import base64
import io
from flask import Blueprint, request, jsonify
from utils.openai_client import get_openai_client, is_api_key_configured

# Create blueprint for transcription routes
transcription_routes = Blueprint('transcription', __name__)

@transcription_routes.route("/api/transcribe", methods=["POST"])
def transcribe_audio():
    """Transcribe audio using OpenAI Whisper API"""
    
    if not is_api_key_configured():
        return jsonify({"error": "OpenAI API key not configured"}), 401
    
    client = get_openai_client()
    if not client:
        return jsonify({"error": "OpenAI client initialization failed"}), 500
    
    data = request.json
    
    if not data or "audio_data" not in data:
        return jsonify({"error": "Missing audio data"}), 400
    
    try:
        # Decode base64 audio data
        audio_bytes = base64.b64decode(data["audio_data"])
        
        # Create temporary file for OpenAI API
        audio_file = io.BytesIO(audio_bytes)
        
        # Get transcription options
        options = data.get("options", {})
        
        # Call OpenAI Whisper API
        response = client.audio.transcriptions.create(
            file=audio_file,
            model="whisper-1",
            language=options.get("language"),
            prompt=options.get("prompt"),
            temperature=options.get("temperature", 0.2)
        )
        
        return jsonify({"text": response.text})
    
    except Exception as e:
        print(f"Transcription error: {str(e)}")
        return jsonify({"error": str(e)}), 500
