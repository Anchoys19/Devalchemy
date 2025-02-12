from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db  # Import db from models.py
import os
from users import users_bp
from quests import quests_bp
from quest_tasks import quest_tasks_bp
from quest_reviews import quest_reviews_bp
from quest_task_test_options import quest_task_test_options_bp
from passed_quests import passed_quests_bp
from passed_quest_tasks import passed_quest_tasks_bp


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
    app.register_blueprint(quest_reviews_bp)
    app.register_blueprint(quest_task_test_options_bp)
    app.register_blueprint(passed_quests_bp)
    app.register_blueprint(passed_quest_tasks_bp)

    @app.route('/')
    def index():
        return "Welcome to the Quest API!"
    jwt = JWTManager(app)
    return app


# Create an instance of the app
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
