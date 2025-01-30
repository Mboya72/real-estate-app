from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()  # Initialize bcrypt globally

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    property_type = db.Column(db.String(50), nullable=False)  # 'buy' or 'rent'

    # Relationship with Review (One-to-Many)
    reviews = db.relationship('Review', backref='property', lazy=True)

    def __repr__(self):
        return f'<Property {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'location': self.location,
            'bedrooms': self.bedrooms,
            'description': self.description,
            'image': self.image,
            'property_type': self.property_type
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_owner = db.Column(db.Boolean, default=False)  # True if user is an owner

    # Relationship with Review (One-to-Many)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        # Use the global bcrypt instance to generate the password hash
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # Use the global bcrypt instance to check the password hash
        return bcrypt.check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_owner': self.is_owner
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)  # Rating (e.g., 1 to 5)
    comment = db.Column(db.String(500), nullable=True)  # Optional comment
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Foreign keys for relationship
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Review for Property {self.property_id} by User {self.user_id}>'

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at,
            'property_id': self.property_id,
            'user_id': self.user_id
        }
