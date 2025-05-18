
"""
Avatar generation routes using Heygen API
"""

import os
import base64
import json
import requests
from flask import Blueprint, request, jsonify, Response
from utils.openai_client import is_api_key_configured

# Create blueprint for avatar routes
avatar_routes = Blueprint('avatar', __name__)

# Heygen API constants
HEYGEN_API_URL = "https://api.heygen.com"

def get_heygen_api_key():
    """Get Heygen API key from environment variables"""
    return os.environ.get("HEYGEN_API_KEY")

def is_heygen_api_key_configured():
    """Check if Heygen API key is configured"""
    return bool(get_heygen_api_key())

@avatar_routes.route("/api/avatar/config", methods=["GET"])
def get_avatar_config():
    """Get avatar configuration status"""
    return jsonify({
        "configured": is_heygen_api_key_configured()
    })

@avatar_routes.route("/api/avatar/set-key", methods=["POST"])
def set_heygen_api_key():
    """Set Heygen API key (temporary, for development only)"""
    data = request.json
    
    if not data or "api_key" not in data:
        return jsonify({"error": "Missing API key"}), 400
    
    # In a real production environment, we would store this securely
    # For this demo, we're setting it as an environment variable temporarily
    os.environ["HEYGEN_API_KEY"] = data["api_key"]
    
    return jsonify({"success": True, "message": "Heygen API key set successfully"})

@avatar_routes.route("/api/avatar/streaming", methods=["POST"])
def create_streaming_avatar():
    """Create a streaming avatar video session"""
    api_key = get_heygen_api_key()
    if not api_key:
        return jsonify({"error": "Heygen API key not configured"}), 401
    
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "Missing text"}), 400
    
    # Extract parameters from request
    text = data["text"]
    avatar_config = data.get("avatar_config", {})
    
    # Default avatar settings if not provided
    if not avatar_config.get("avatar_id"):
        avatar_config["avatar_id"] = "ad8d7dd2"  # Default avatar
    
    if not avatar_config.get("voice_id"):
        avatar_config["voice_id"] = "11labs.sarah"  # Default voice
    
    # Prepare request to Heygen API
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": api_key
    }
    
    body = {
        "text": text,
        "avatar_id": avatar_config.get("avatar_id"),
        "voice_id": avatar_config.get("voice_id"),
        "output_format": "mp4",
        "streaming": True
    }
    
    try:
        # Call Heygen API to initialize streaming session
        response = requests.post(
            f"{HEYGEN_API_URL}/v1/talking-photo/streaming/start",
            headers=headers,
            json=body
        )
        
        response.raise_for_status()
        result = response.json()
        
        return jsonify(result)
    
    except requests.exceptions.RequestException as e:
        print(f"Heygen API error: {str(e)}")
        if hasattr(e, 'response') and e.response:
            try:
                error_detail = e.response.json()
                return jsonify({"error": str(e), "details": error_detail}), e.response.status_code
            except:
                return jsonify({"error": str(e)}), 500
        return jsonify({"error": str(e)}), 500

@avatar_routes.route("/api/avatar/proxy", methods=["GET"])
def proxy_streaming_url():
    """Proxy streaming URL to avoid CORS issues"""
    stream_url = request.args.get("url")
    if not stream_url:
        return jsonify({"error": "Missing streaming URL"}), 400
    
    api_key = get_heygen_api_key()
    if not api_key:
        return jsonify({"error": "Heygen API key not configured"}), 401
    
    try:
        # Forward the request to Heygen streaming API
        headers = {
            "X-Api-Key": api_key
        }
        
        resp = requests.get(stream_url, headers=headers, stream=True)
        resp.raise_for_status()
        
        # Stream the response back to client
        def generate():
            for chunk in resp.iter_content(chunk_size=8192):
                yield chunk
        
        return Response(
            generate(),
            content_type=resp.headers['Content-Type'],
            status=resp.status_code
        )
    
    except requests.exceptions.RequestException as e:
        print(f"Proxy error: {str(e)}")
        return jsonify({"error": str(e)}), 500

