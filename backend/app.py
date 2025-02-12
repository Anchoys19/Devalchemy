from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db  # Import db from models.py
import os
from users import users_bp
from quests import quests_bp
from quest_tasks import quest_tasks_bp


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    with app.app_context():
        db.create_all()  # Create tables if they don't already exist

    app.register_blueprint(users_bp)
    app.register_blueprint(quests_bp)
    app.register_blueprint(quest_tasks_bp)

    @app.route('/')
    def index():
        return "Welcome to the Quest API!"
    jwt = JWTManager(app)
    return app


# Create an instance of the app
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
