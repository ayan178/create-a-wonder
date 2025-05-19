
"""
Authentication and API key management routes
"""

import os
import datetime
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, get_jwt
)
from werkzeug.security import generate_password_hash
from email_validator import validate_email, EmailNotValidError

from models.user import User, db
from models.candidate import Candidate
from models.employer import Employer
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
        "api_key_configured": is_api_key_configured(),
        "database_connected": db.engine.dialect.has_table(db.engine.connect(), 'users')
    }
    
    return jsonify(health_status)

@auth_routes.route("/api/auth/register/candidate", methods=["POST"])
def register_candidate():
    """Register a new candidate"""
    data = request.json
    
    # Validate required fields
    required_fields = ['email', 'password', 'first_name', 'last_name']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
            
    # Validate email format
    try:
        validate_email(data['email'])
    except EmailNotValidError as e:
        return jsonify({"error": f"Invalid email: {str(e)}"}), 400
            
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 409
        
    # Create new candidate
    try:
        candidate = Candidate(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone', ''),
            job_title=data.get('job_title', '')
        )
        candidate.set_password(data['password'])
        
        db.session.add(candidate)
        db.session.commit()
        
        # Generate tokens
        access_token = create_access_token(identity=candidate.id)
        refresh_token = create_refresh_token(identity=candidate.id)
        
        return jsonify({
            "message": "Candidate registered successfully",
            "user": candidate.to_dict(),
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

@auth_routes.route("/api/auth/register/employer", methods=["POST"])
def register_employer():
    """Register a new employer"""
    data = request.json
    
    # Validate required fields
    required_fields = ['email', 'password', 'first_name', 'last_name', 'company_name']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
            
    # Validate email format
    try:
        validate_email(data['email'])
    except EmailNotValidError as e:
        return jsonify({"error": f"Invalid email: {str(e)}"}), 400
            
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 409
        
    # Create new employer
    try:
        employer = Employer(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            company_name=data['company_name'],
            industry=data.get('industry', ''),
            company_size=data.get('company_size', '')
        )
        employer.set_password(data['password'])
        
        db.session.add(employer)
        db.session.commit()
        
        # Generate tokens
        access_token = create_access_token(identity=employer.id)
        refresh_token = create_refresh_token(identity=employer.id)
        
        return jsonify({
            "message": "Employer registered successfully",
            "user": employer.to_dict(),
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

@auth_routes.route("/api/auth/login", methods=["POST"])
def login():
    """Login for both candidates and employers"""
    data = request.json
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400
        
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
        
    # Generate tokens
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        "message": "Login successful",
        "user": user.to_dict(),
        "user_type": user.user_type,
        "access_token": access_token,
        "refresh_token": refresh_token
    }), 200

@auth_routes.route("/api/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    """Refresh access token"""
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    
    return jsonify({
        "message": "Token refreshed",
        "access_token": access_token
    }), 200

@auth_routes.route("/api/auth/me", methods=["GET"])
@jwt_required()
def get_user_profile():
    """Get current user profile"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    return jsonify({
        "user": user.to_dict()
    }), 200

@auth_routes.route("/api/auth/logout", methods=["POST"])
@jwt_required()
def logout():
    """Logout user (revoke token)"""
    # In a more complete implementation, you would revoke the token here
    # For now, we'll just return a success message
    return jsonify({"message": "Logout successful"}), 200
