
"""
Authentication and API key management routes
"""

from flask import Blueprint, request, jsonify
from utils.openai_client import set_api_key, is_api_key_configured

# Create blueprint for auth routes
auth_routes = Blueprint('auth', __name__)

@auth_routes.route("/api/set-api-key", methods=["POST"])
def set_api_key_route():
    """Set the OpenAI API key"""
    data = request.json
    
    if not data or "api_key" not in data:
        return jsonify({"error": "Missing API key"}), 400
    
    # Test if the API key works
    try:
        # Initialize client and make a test request
        client = set_api_key(data["api_key"])
        
        # Make a simple test request to verify the API key
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "Test"}],
            max_tokens=5
        )
        return jsonify({"status": "ok", "message": "API key set successfully"})
    except Exception as e:
        return jsonify({"error": f"Invalid API key: {str(e)}"}), 400

@auth_routes.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    health_status = {
        "status": "ok", 
        "message": "Backend is running",
        "api_key_configured": is_api_key_configured()
    }
    
    return jsonify(health_status)
