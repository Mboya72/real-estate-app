from app import app, db
from models import User, BuyProperty, RentProperty, Review, Transaction
from flask_bcrypt import Bcrypt

# Initialize bcrypt for password hashing
bcrypt = Bcrypt(app)

# Sample data for users
users_data = [
    {"username": "john_doe", "email": "john@example.com", "password": "password123"},
    {"username": "jane_smith", "email": "jane@example.com", "password": "password456"},
    {"username": "alice_jones", "email": "alice@example.com", "password": "password789"}
]

# Sample data for properties (both buy and rent)
properties_data = [
    {"name": "Luxury 4-Bedroom Villa", "price": 850000, "location": "Miami", "bedrooms": 4, "description": "This modern villa comes with a private pool and breathtaking views.", "image": "https://i.pinimg.com/736x/2f/9e/0c/2f9e0c4aaffa3cecaea412e1e5e8deb1.jpg", "property_type": "buy"},
    {"name": "Charming 3-Bedroom House", "price": 400000, "location": "Austin", "bedrooms": 3, "description": "Perfect for families looking for a cozy yet affordable home.", "image": "https://i.pinimg.com/736x/ad/1e/ef/ad1eef868f03b46f4e6821a12f53d8cb.jpg", "property_type": "buy"},
    {"name": "Cozy 2-Bedroom Apartment", "price": 1200, "location": "New York", "bedrooms": 2, "description": "Located in a prime neighborhood with easy access to shops and parks.", "image": "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799635.jpg", "property_type": "rent"},
    {"name": "Spacious 3-Bedroom House", "price": 2500, "location": "Los Angeles", "bedrooms": 3, "description": "Perfect for families with a large backyard and modern amenities.", "image": "https://img.freepik.com/free-photo/luxury-architecture-exterior-design_23-2151920974.jpg", "property_type": "rent"}
]

# Sample data for reviews
reviews_data = [
    {"rating": 5, "comment": "Amazing property with a fantastic view!", "user_email": "john@example.com", "property_name": "Luxury 4-Bedroom Villa"},
    {"rating": 4, "comment": "Nice and spacious, but the price is a bit high.", "user_email": "jane@example.com", "property_name": "Charming 3-Bedroom House"},
    {"rating": 3, "comment": "Great location, but needs some improvements inside.", "user_email": "alice@example.com", "property_name": "Cozy 2-Bedroom Apartment"},
    {"rating": 5, "comment": "Perfect for a family, with all the modern amenities.", "user_email": "john@example.com", "property_name": "Spacious 3-Bedroom House"}
]

# Function to seed the database
def seed_db():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Add users
        for user_data in users_data:
            hashed_password = bcrypt.generate_password_hash(user_data["password"]).decode("utf-8")
            user = User(username=user_data["username"], email=user_data["email"], password_hash=hashed_password)
            db.session.add(user)

        # Commit the user data
        db.session.commit()

        # Add properties (buy and rent separately)
        for property_data in properties_data:
            if property_data["property_type"] == "buy":
                property = BuyProperty(
                    name=property_data["name"],
                    price=property_data["price"],
                    location=property_data["location"],
                    bedrooms=property_data["bedrooms"],
                    description=property_data["description"],
                    image=property_data["image"],
                    property_type=property_data["property_type"]
                )
            else:
                property = RentProperty(
                    name=property_data["name"],
                    price=property_data["price"],
                    location=property_data["location"],
                    bedrooms=property_data["bedrooms"],
                    description=property_data["description"],
                    image=property_data["image"],
                    property_type=property_data["property_type"]
                )
            db.session.add(property)

        # Commit the property data
        db.session.commit()

        # Add reviews
        for review_data in reviews_data:
            user = User.query.filter_by(email=review_data["user_email"]).first()
            if property_data["property_type"] == "buy":
                property = BuyProperty.query.filter_by(name=review_data["property_name"]).first()
            else:
                property = RentProperty.query.filter_by(name=review_data["property_name"]).first()

            if user and property:
                review = Review(
                    rating=review_data["rating"],
                    comment=review_data["comment"],
                    property_id=property.id,
                    user_id=user.id
                )
                db.session.add(review)

        # Commit the review data
        db.session.commit()

        print("Database seeded successfully!")

# Run the seeding script
if __name__ == "__main__":
    seed_db()
