from extensions import db  # No need to initialize db again here
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app import bcrypt

# Buy Property Model
class BuyProperty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=True)

    # Relationship with Review (change backref name to 'buy_reviews')
    reviews = db.relationship('Review', backref='buy_reviews', lazy=True)

    def __repr__(self):
        return f'<BuyProperty {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'location': self.location,
            'bedrooms': self.bedrooms,
            'description': self.description,
            'image': self.image
        }

# Rent Property Model
class RentProperty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=True)

    # Relationship with Review (change backref name to 'rent_reviews')
    reviews = db.relationship('Review', backref='rent_reviews', lazy=True)

    def __repr__(self):
        return f'<RentProperty {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'location': self.location,
            'bedrooms': self.bedrooms,
            'description': self.description,
            'image': self.image
        }

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_owner = db.Column(db.Boolean, default=False)  # True if user is an owner
    reviews = db.relationship('Review', back_populates='user', lazy=True)  # Relationship with Review

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        # Use bcrypt to hash the password
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # Use bcrypt to check the password
        return bcrypt.check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_owner': self.is_owner
        }

# Review Model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(300), nullable=False)
    
    # Foreign keys
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    property_id = db.Column(db.Integer, nullable=False)

    # Relationships for buy and rent properties
    buy_property_id = db.Column(db.Integer, ForeignKey('buy_property.id'), nullable=True)
    rent_property_id = db.Column(db.Integer, ForeignKey('rent_property.id'), nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='reviews')
    buy_property = db.relationship('BuyProperty', backref='buy_reviews', uselist=False)
    rent_property = db.relationship('RentProperty', backref='rent_reviews', uselist=False)

    def __repr__(self):
        return f'<Review {self.id} for Property {self.property_id}>'

    def serialize(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'user_id': self.user_id,
            'buy_property_id': self.buy_property_id,
            'rent_property_id': self.rent_property_id,
        }
        
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Contact {self.id} - {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'created_at': self.created_at,
        }