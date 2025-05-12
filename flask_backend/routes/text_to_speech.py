
"""
Text-to-speech conversion routes
"""

import base64
from flask import Blueprint, request, jsonify
from utils.openai_client import get_openai_client, is_api_key_configured

# Create blueprint for TTS routes
tts_routes = Blueprint('tts', __name__)

@tts_routes.route("/api/text-to-speech", methods=["POST"])
def text_to_speech():
    """Convert text to speech using OpenAI TTS API"""
    
    if not is_api_key_configured():
        return jsonify({"error": "OpenAI API key not configured"}), 401
    
    client = get_openai_client()
    if not client:
        return jsonify({"error": "OpenAI client initialization failed"}), 500
    
    data = request.json
    
    if not data or "text" not in data:
        return jsonify({"error": "Missing text"}), 400
    
    try:
        text = data["text"]
        options = data.get("options", {})
        
        # Log the incoming request
        print(f"TTS request: '{text[:30]}...' with options: {options}")
        
        # Default to higher volume/amplification
        voice = options.get("voice", "nova")  # Using nova for a more natural voice
        model = options.get("model", "tts-1-hd")
        speed = options.get("speed", 1.0)
        
        # Call OpenAI TTS API with more natural-sounding voice
        response = client.audio.speech.create(
            model=model,
            voice=voice,
            input=text,
            speed=speed,
            # Use higher quality audio format when available
            response_format="mp3" 
        )
        
        # Convert audio to base64
        audio_base64 = base64.b64encode(response.content).decode("utf-8")
        
        print(f"TTS generation successful, audio size: {len(audio_base64) // 1024}KB")
        
        return jsonify({
            "audio_data": audio_base64,
            "format": "mp3",
            "voice": voice,
            "model": model,
            "success": True
        })
    
    except Exception as e:
        print(f"TTS error: {str(e)}")
        return jsonify({
            "error": str(e),
            "success": False
        }), 500
