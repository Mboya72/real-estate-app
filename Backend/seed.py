from app import app, db
from models import User, BuyProperty, RentProperty, Review
from faker import Faker

# Initialize faker for generating random data
fake = Faker()

# Sample data for users
users_data = [
    {"username": "john_doe", "email": "john@example.com", "password": "password123"},
    {"username": "jane_smith", "email": "jane@example.com", "password": "password456"},
    {"username": "alice_jones", "email": "alice@example.com", "password": "password789"}
]

# Sample data for buy properties
buy_properties_data = [
    {"name": "Luxury 4-Bedroom Villa", "price": 850000, "location": "Miami", "bedrooms": 4, "description": "This modern villa comes with a private pool and breathtaking views.", "image": "https://i.pinimg.com/736x/2f/9e/0c/2f9e0c4aaffa3cecaea412e1e5e8deb1.jpg"},
    {"name": "Charming 3-Bedroom House", "price": 400000, "location": "Austin", "bedrooms": 3, "description": "Perfect for families looking for a cozy yet affordable home.", "image": "https://i.pinimg.com/736x/ad/1e/ef/ad1eef868f03b46f4e6821a12f53d8cb.jpg"}
]

# Sample data for rent properties
rent_properties_data = [
    {"name": "Cozy 2-Bedroom Apartment", "price": 1200, "location": "New York", "bedrooms": 2, "description": "Located in a prime neighborhood with easy access to shops and parks.", "image": "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799635.jpg"},
    {"name": "Spacious 3-Bedroom House", "price": 2500, "location": "Los Angeles", "bedrooms": 3, "description": "Perfect for families with a large backyard and modern amenities.", "image": "https://img.freepik.com/free-photo/luxury-architecture-exterior-design_23-2151920974.jpg"}
]

# Sample data for reviews
reviews_data = [
    {"rating": 5, "comment": "Amazing property with a fantastic view!", "user_email": "john@example.com", "property_name": "Luxury 4-Bedroom Villa"},
    {"rating": 4, "comment": "Nice and spacious, but the price is a bit high.", "user_email": "jane@example.com", "property_name": "Charming 3-Bedroom House"},
    {"rating": 3, "comment": "Great location, but needs some improvements inside.", "user_email": "alice@example.com", "property_name": "Cozy 2-Bedroom Apartment"},
    {"rating": 5, "comment": "Perfect for a family, with all the modern amenities.", "user_email": "john@example.com", "property_name": "Spacious 3-Bedroom House"}
]

# Function to seed the database
# Function to seed the database
def seed_db():
    with app.app_context():
        print("Seeding started...")
        try:
            db.drop_all()  # This will drop all tables
            db.create_all()  # This will recreate all tables

            # Add users
            for user_data in users_data:
                user = User(username=user_data["username"], email=user_data["email"])
                user.set_password(user_data["password"])  # Set password via the method
                db.session.add(user)

            # Commit the user data
            db.session.commit()

            print("Users added successfully.")

            # Add buy properties
            for buy_property_data in buy_properties_data:
                buy_property = BuyProperty(
                    name=buy_property_data["name"],
                    price=buy_property_data["price"],
                    location=buy_property_data["location"],
                    bedrooms=buy_property_data["bedrooms"],
                    description=buy_property_data["description"],
                    image=buy_property_data["image"]
                )
                db.session.add(buy_property)

            # Commit the buy properties
            db.session.commit()

            print("Buy properties added successfully.")

            # Add rent properties
            for rent_property_data in rent_properties_data:
                rent_property = RentProperty(
                    name=rent_property_data["name"],
                    price=rent_property_data["price"],
                    location=rent_property_data["location"],
                    bedrooms=rent_property_data["bedrooms"],
                    description=rent_property_data["description"],
                    image=rent_property_data["image"]
                )
                db.session.add(rent_property)

            # Commit the rent properties
            db.session.commit()

            print("Rent properties added successfully.")

            # Add reviews
            for review_data in reviews_data:
                user = User.query.filter_by(email=review_data["user_email"]).first()
                
                # Get the buy or rent property based on the name
                buy_property = BuyProperty.query.filter_by(name=review_data["property_name"]).first()
                rent_property = RentProperty.query.filter_by(name=review_data["property_name"]).first()

                if user and (buy_property or rent_property):
                    if buy_property:
                        review = Review(
                            rating=review_data["rating"],
                            comment=review_data["comment"],
                            user_id=user.id,
                            buy_property_id=buy_property.id,  # Reference the buy property
                            property_id=buy_property.id  # Set the property_id to buy_property.id
                        )
                    elif rent_property:
                        review = Review(
                            rating=review_data["rating"],
                            comment=review_data["comment"],
                            user_id=user.id,
                            rent_property_id=rent_property.id,  # Reference the rent property
                            property_id=rent_property.id  # Set the property_id to rent_property.id
                        )
                    else:
                        continue  # Skip if neither property is found
                    db.session.add(review)

            # Commit the review data all at once
            db.session.commit()

            print("Reviews added successfully.")

            print("Database seeded successfully!")

        except Exception as e:
            db.session.rollback()  # Rollback in case of an error
            print(f"Error seeding the database: {e}")

# Run the seed function
if __name__ == "__main__":
    seed_db()