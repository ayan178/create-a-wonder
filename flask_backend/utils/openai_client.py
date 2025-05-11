
"""
Shared OpenAI client utilities
"""

import os
from openai import OpenAI

# Global OpenAI API key storage
openai_api_key = os.environ.get("OPENAI_API_KEY", "")

# Global OpenAI client
client = None

def get_openai_client():
    """Get or initialize the OpenAI client"""
    global client, openai_api_key
    
    if openai_api_key and client is None:
        try:
            # Initialize client without any extra parameters that might cause issues
            client = OpenAI(api_key=openai_api_key)
        except Exception as e:
            print(f"Error initializing OpenAI client: {str(e)}")
            return None
    
    return client

def set_api_key(key):
    """Set the OpenAI API key and initialize client"""
    global openai_api_key, client
    
    # Store the API key
    openai_api_key = key.strip()
    
    try:
        # Initialize the client with the new API key only
        client = OpenAI(api_key=openai_api_key)
        return client
    except Exception as e:
        print(f"Error setting API key: {str(e)}")
        return None

def is_api_key_configured():
    """Check if API key is configured"""
    global openai_api_key
    return bool(openai_api_key)
