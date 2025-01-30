class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///real_estate.db'  # You can change to PostgreSQL or MySQL later
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key'
