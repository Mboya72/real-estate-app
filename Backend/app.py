from flask import Flask, jsonify, request, session
from flask_cors import CORS
from models import db, Property, User, Review
from config import Config
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

# Initialize the app, extensions, and database
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize the extensions
db.init_app(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

# Set a secret key for sessions (You can change it to something more secure)
app.config['SECRET_KEY'] = 'your-secure-secret-key'

# Endpoint to register a new user (for authentication purposes)
@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required."}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists."}), 400

    # Create a new user
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# Endpoint to login a user and store the user ID in session
@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    # Find the user by email
    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password."}), 401

    # Store the user ID in session after successful login
    session["user_id"] = user.id
    print("Session after login:", session)  # Debugging log

    return jsonify({"message": "Logged in successfully!"}), 200

# Endpoint to logout the user (clear session)
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)  # Remove the user ID from session
    return jsonify({"message": "Logged out successfully!"}), 200

# Endpoint to get all properties
@app.route("/properties", methods=["GET"])
def get_properties():
    properties = Property.query.all()
    property_list = [property.serialize() for property in properties]
    return jsonify(property_list)

# Endpoint to add a new property (requires authentication via session)
@app.route("/properties", methods=["POST"])
def add_property():
    # Check if the user is logged in
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to add a property."}), 403

    data = request.get_json()

    name = data.get("name")
    price = data.get("price")
    location = data.get("location")
    bedrooms = data.get("bedrooms")
    description = data.get("description")
    image = data.get("image")
    property_type = data.get("property_type")

    if not all([name, price, location, bedrooms, property_type]):
        return jsonify({"error": "All fields are required."}), 400

    new_property = Property(
        name=name,
        price=price,
        location=location,
        bedrooms=bedrooms,
        description=description,
        image=image,
        property_type=property_type
    )

    db.session.add(new_property)
    db.session.commit()

    return jsonify(new_property.serialize()), 201

# Endpoint to get reviews for a specific property
@app.route("/properties/<int:property_id>/reviews", methods=["GET"])
def get_reviews_for_property(property_id):
    reviews = Review.query.filter_by(property_id=property_id).all()
    review_list = [review.serialize() for review in reviews]
    return jsonify(review_list)

# Endpoint to add a review for a property (requires authentication via session)
@app.route("/properties/<int:property_id>/reviews", methods=["POST"])
def add_review_for_property(property_id):
    # Check if the user is logged in
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to add a review."}), 403

    data = request.get_json()

    rating = data.get("rating")
    comment = data.get("comment", "")

    if not rating or not (1 <= rating <= 5):
        return jsonify({"error": "Rating must be between 1 and 5."}), 400

    user_id = session["user_id"]  # Get the current logged-in user's ID

    new_review = Review(
        rating=rating,
        comment=comment,
        property_id=property_id,
        user_id=user_id
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.serialize()), 201

# Endpoint to get the current user's profile
@app.route("/profile", methods=["GET"])
def get_profile():
    # Check if the user is logged in
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to view your profile."}), 403

    user_id = session["user_id"]
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found."}), 404

    return jsonify(user.serialize())

if __name__ == "__main__":
    app.run(debug=True)
