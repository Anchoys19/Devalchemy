from flask import Blueprint, jsonify, request, abort
from models import Users, SocialMediaAccount, QuestReviews, db
from passlib.hash import argon2
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Create a blueprint for users
users_bp = Blueprint('users', __name__)

GOOGLE_CLIENT_ID = "559203323210-iajpj3pu9kjibqmmec31le6m82oo7vp9.apps.googleusercontent.com"


def user_to_dict(user: Users) -> dict:
    """Utility function to convert a Users object to a dictionary"""
    # TODO: add ratings,quests?
    return {
        'id': user.id,
        'nickname': user.nickname,
        'email': user.email,
        'gender': user.gender,
        'phone_number': user.phone_number,
        'profile_pic_ref': user.profile_pic_ref
    }


def dict_to_user(data):
    """Utility function to convert a dictionary to a Users object"""
    password_hash = argon2.hash(data['password'])
    return Users(
        nickname=data.get('nickname'),
        email=data.get('email'),
        password_hash=password_hash,
        gender=data.get('gender', None),
        phone_number=data.get('phone_number', None),
        profile_pic_ref=data.get('profile_pic_ref', None)
    )


# GET all users
@users_bp.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()  # Get all users
    # Use user_to_dict to convert each user to a dictionary
    users_list = [user_to_dict(user) for user in users]
    return jsonify(users_list)


# GET a user by id
@users_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = Users.query.get(id)  # Get a user by id
    if not user:
        # If the user doesn't exist, return a 404 error
        abort(404, description="User not found")
    return jsonify(user_to_dict(user))  # Return the user as a dictionary


# AUTH a user with his google account
@users_bp.route('/auth/google', methods=['POST'])
def google_auth():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "No token provided"}), 400

    try:
        # Verify Google token
        google_user = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID)

        email = google_user.get("email")
        name = google_user.get("name")
        picture = google_user.get("picture")

        # Check if user exists in DB
        user = Users.query.filter_by(email=email).first()

        if not user:
            # If user doesn't exist, create one
            user = Users(email=email, nickname=name, profile_pic_ref=picture)
            db.session.add(user)
            socialMedia = SocialMediaAccount(
                social_media_name="Google", id_user=user.id)
            db.session.add(socialMedia)
            db.session.commit()

        # Generate JWT token for authentication
        access_token = create_access_token(identity=user.id)

        return jsonify({"message": "Login successful", "access_token": access_token, "user": user_to_dict(user)}), 201

    except Exception as e:
        return jsonify({"error": "Invalid Google token"}), 401


@users_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Validate input fields
    if not data or 'password' not in data or 'email' not in data or 'nickname' not in data:
        abort(400, description="Missing required fields: email, password, or nickname")

    # Check if the user already exists
    existing_user = Users.query.filter_by(email=data['email']).first()
    if existing_user:
        abort(409, description="User with this email already exists")

    existing_user = Users.query.filter_by(nickname=data['nickname']).first()
    if existing_user:
        abort(409, description="User with this nickname already exists")

    # Create new user
    new_user = dict_to_user(data)

    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token (auto-login)
    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "message": "User created successfully",
        "access_token": access_token,
        "user": user_to_dict(new_user)
    }), 201


@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'password' not in data or 'email' not in data:
        abort(400, description="Missing required fields: email or password")

    user = Users.query.filter_by(email=data['email']).first()

    if not user or not argon2.verify(data['password'], user.password_hash):
        abort(401, description="Invalid email or password")

    # Generate JWT token for authentication
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {"email": user.email, "nickname": user.nickname}
    }), 200


# PUT (update) current user
@users_bp.route('/users', methods=['PUT'], endpoint='update_user')
@jwt_required
def update_user():
    user_id = get_jwt_identity()
    user = Users.query.get(user_id)  # Get the user by id
    if not user:
        # If the user doesn't exist, return a 404 error
        abort(404, description="User not found")

    # Get data from the request body and update the user object
    data = request.get_json()
    user.nickname = data.get('nickname', user.nickname)
    user.email = data.get('email', user.email)
    if data['password']:
        user.password_hash = argon2.hash(data.get('password'))
    user.gender = data.get('gender', user.gender)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.profile_pic_ref = data.get('profile_pic_ref', user.profile_pic_ref)

    db.session.commit()  # Commit the changes to the database

    # Return success message
    return jsonify({'message': 'User updated successfully', 'user': user_to_dict(user)}), 200


# DELETE current user
@users_bp.route('/users', methods=['DELETE'], endpoint='delete_user')
@jwt_required
def delete_user():
    user_id = get_jwt_identity()
    user = Users.query.get(user_id)  # Get the user by id
    if not user:
        # If the user doesn't exist, return a 404 error
        abort(404, description="User not found")

    db.session.delete(user)  # Mark the user for deletion
    db.session.commit()  # Commit the transaction to delete the user

    # Return success message
    return jsonify({'message': 'User deleted successfully'}), 200
