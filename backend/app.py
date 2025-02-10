from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# Import and register blueprints

# Initialize Flask extensions
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    @app.route('/')
    def index():
        return "Welcome to the Quest API!"

    return app


# Create an instance of the app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
