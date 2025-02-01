from flask import Flask, jsonify, request, session
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, migrate  # Import from extensions.py
from models import BuyProperty, RentProperty, User, Review  # Import models after db initialization

# Initialize the app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
migrate.init_app(app, db)

# Set a secret key for sessions
app.config['SECRET_KEY'] = 'your-secure-secret-key'

# Routes (your existing routes remain the same)

# User Registration Route
@app.route('/user', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate data
    if not username or not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 400

    # Create a new user
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 201


# User Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validate data
    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        session['user_id'] = user.id  # Store user ID in session
        return jsonify({'message': 'Logged in successfully!'}), 200
    return jsonify({'error': 'Invalid email or password'}), 401


# User Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from session
    return jsonify({'message': 'Logged out successfully!'}), 200


# Endpoint to get all buy properties
@app.route("/buy-properties", methods=["GET"])
def get_buy_properties():
    buy_properties = BuyProperty.query.all()
    property_list = [property.serialize() for property in buy_properties]
    return jsonify(property_list)


# Endpoint to get all rent properties
@app.route("/rent-properties", methods=["GET"])
def get_rent_properties():
    rent_properties = RentProperty.query.all()
    property_list = [property.serialize() for property in rent_properties]
    return jsonify(property_list)


# Endpoint to add a new buy property (requires authentication via session)
@app.route("/buy-properties", methods=["POST"])
def add_buy_property():
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to add a property."}), 403

    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    location = data.get("location")
    bedrooms = data.get("bedrooms")
    description = data.get("description")
    image = data.get("image")

    if not all([name, price, location, bedrooms]):
        return jsonify({"error": "All fields are required."}), 400

    new_property = BuyProperty(
        name=name,
        price=price,
        location=location,
        bedrooms=bedrooms,
        description=description,
        image=image
    )

    db.session.add(new_property)
    db.session.commit()

    return jsonify(new_property.serialize()), 201


# Endpoint to add a new rent property (requires authentication via session)
@app.route("/rent-properties", methods=["POST"])
def add_rent_property():
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to add a property."}), 403

    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    location = data.get("location")
    bedrooms = data.get("bedrooms")
    description = data.get("description")
    image = data.get("image")

    if not all([name, price, location, bedrooms]):
        return jsonify({"error": "All fields are required."}), 400

    new_property = RentProperty(
        name=name,
        price=price,
        location=location,
        bedrooms=bedrooms,
        description=description,
        image=image
    )

    db.session.add(new_property)
    db.session.commit()

    return jsonify(new_property.serialize()), 201


# Endpoint to submit a review for a property@app.route('/submit-review', methods=['POST'])
def submit_review():
    data = request.get_json()
    
    # Debugging: print the incoming data
    print(f"Received data: {data}")

    # Validate input data
    user_email = data.get('user_email')
    property_id = data.get('property_id')
    comment = data.get('comment')
    rating = data.get('rating')

    if not user_email or not property_id or not comment or not rating:
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400

    # Find user by email
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404

    # Find the property (either BuyProperty or RentProperty)
    buy_property = BuyProperty.query.get(property_id)
    rent_property = RentProperty.query.get(property_id)

    # If neither property is found, return an error
    if not buy_property and not rent_property:
        return jsonify({'success': False, 'message': 'Property not found'}), 404
    
    # Create the review
    review = Review(
        rating=rating,
        comment=comment,
        user_id=user.id,
        buy_property_id=buy_property.id if buy_property else None,
        rent_property_id=rent_property.id if rent_property else None,
    )

    # Add the review to the database
    db.session.add(review)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Review submitted successfully!'}), 200
