from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()  # Initialize bcrypt globally

class BuyProperty(db.Model):
    __tablename__ = 'buy_property'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    property_type = db.Column(db.String(50), nullable=False)  # 'buy'
    
    transactions = db.relationship('Transaction', backref='buy_property', lazy=True)
    
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
            'image': self.image,
            'property_type': self.property_type
        }

class RentProperty(db.Model):
    __tablename__ = 'rent_property'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    property_type = db.Column(db.String(50), nullable=False)  # 'rent'
    
    transactions = db.relationship('Transaction', backref='rent_property', lazy=True)

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
            'image': self.image,
            'property_type': self.property_type
        }

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(50), nullable=False)  # 'buy' or 'rent'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('buy_property.id'), nullable=True)
    property_id_rent = db.Column(db.Integer, db.ForeignKey('rent_property.id'), nullable=True)

    user = db.relationship('User', backref='transactions')
    bought_property = db.relationship('BuyProperty', backref='transactions', foreign_keys=[property_id])
    rented_property = db.relationship('RentProperty', backref='transactions', foreign_keys=[property_id_rent])

    def __repr__(self):
        return f'<Transaction {self.transaction_type} for Property {self.bought_property.name if self.transaction_type == "buy" else self.rented_property.name}>'

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
