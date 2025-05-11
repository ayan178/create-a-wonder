
"""
AI response generation routes
"""

from flask import Blueprint, request, jsonify
from utils.openai_client import get_openai_client, is_api_key_configured

# Create blueprint for response generation routes
response_routes = Blueprint('response', __name__)

@response_routes.route("/api/generate-response", methods=["POST"])
def generate_response():
    """Generate AI response using OpenAI GPT"""
    
    if not is_api_key_configured():
        return jsonify({"error": "OpenAI API key not configured"}), 401
    
    client = get_openai_client()
    if not client:
        return jsonify({"error": "OpenAI client initialization failed"}), 500
    
    data = request.json
    
    if not data or "transcript" not in data:
        return jsonify({"error": "Missing transcript"}), 400
    
    try:
        transcript = data["transcript"]
        current_question = data.get("currentQuestion", "")
        options = data.get("options", {})
        
        # Create system prompt
        system_prompt = options.get("systemPrompt") or f"""
        You are an AI interviewer conducting a job interview. 
        Your name is AI Interviewer. You are currently asking: "{current_question}"
        Respond naturally to the candidate's answer. Keep your response brief (2-3 sentences maximum).
        Be conversational but professional. Ask thoughtful follow-up questions when appropriate.
        You must respond in complete sentences, even if the candidate's answer is unclear.
        If the candidate's answer shows they are done with this topic, end with "Let's move on to the next question."
        If the candidate's answer is unclear, ask them to clarify.
        IMPORTANT: Don't repeat yourself. Never say "Thank you for sharing" or similar phrases repeatedly.
        """
        
        # Call OpenAI Chat Completions API
        response = client.chat.completions.create(
            model=options.get("model", "gpt-4o-mini"),
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": transcript}
            ],
            temperature=options.get("temperature", 0.7),
            max_tokens=options.get("maxTokens", 250)
        )
        
        return jsonify({"response": response.choices[0].message.content})
    
    except Exception as e:
        print(f"AI response generation error: {str(e)}")
        return jsonify({"error": str(e)}), 500
