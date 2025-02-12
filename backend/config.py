import os

# Load secret key from environment variables (fallback to a default for dev)
SECRET_KEY = os.getenv("SECRET_KEY", "veryverysecretkey")

# Load database URI from environment variables (fallback to local MySQL)
SQLALCHEMY_DATABASE_URI = os.getenv(
    "DATABASE_URI", "mysql+pymysql://devalchemy:devalchemy@localhost/devalchemytest"
)

# Disable SQLAlchemy modification tracking (recommended for performance)
SQLALCHEMY_TRACK_MODIFICATIONS = False