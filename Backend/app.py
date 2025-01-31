from flask import Flask, jsonify, request, session
from flask_cors import CORS
from models import db, Property, User, Review, BuyProperty, RentProperty, Transaction
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
    return jsonify({"message": "Logged in successfully!"}), 200

# Endpoint to logout the user (clear session)
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)  # Remove the user ID from session
    return jsonify({"message": "Logged out successfully!"}), 200

# Endpoint to buy a property
@app.route("/properties/<int:property_id>/buy", methods=["POST"])
def buy_property(property_id):
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to buy a property."}), 403

    user_id = session["user_id"]
    user = User.query.get(user_id)

    property = BuyProperty.query.get(property_id)

    if not property:
        return jsonify({"error": "Property not found."}), 404

    # Check if user has already bought the property
    existing_transaction = Transaction.query.filter_by(user_id=user.id, property_id=property.id, transaction_type="buy").first()
    if existing_transaction:
        return jsonify({"message": "You already bought this property."}), 400

    # Create a new transaction for buying the property
    new_transaction = Transaction(
        transaction_type="buy",
        user_id=user.id,
        property_id=property.id
    )
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Property bought successfully!"}), 200

# Endpoint to rent a property
@app.route("/properties/<int:property_id>/rent", methods=["POST"])
def rent_property(property_id):
    if "user_id" not in session:
        return jsonify({"error": "You must be logged in to rent a property."}), 403

    user_id = session["user_id"]
    user = User.query.get(user_id)

    property = RentProperty.query.get(property_id)

    if not property:
        return jsonify({"error": "Property not found."}), 404

    # Check if user has already rented the property
    existing_transaction = Transaction.query.filter_by(user_id=user.id, property_id_rent=property.id, transaction_type="rent").first()
    if existing_transaction:
        return jsonify({"message": "You already rented this property."}), 400

    # Create a new transaction for renting the property
    new_transaction = Transaction(
        transaction_type="rent",
        user_id=user.id,
        property_id_rent=property.id
    )
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Property rented successfully!"}), 200

# Helper function to check if the user has bought the property
def user_has_bought_property(property_id):
    if "user_id" not in session:
        return False
    user_id = session["user_id"]
    transaction = Transaction.query.filter_by(user_id=user_id, property_id=property_id, transaction_type="buy").first()
    return transaction is not None

# Helper function to check if the user has rented the property
def user_has_rented_property(property_id):
    if "user_id" not in session:
        return False
    user_id = session["user_id"]
    transaction = Transaction.query.filter_by(user_id=user_id, property_id_rent=property_id, transaction_type="rent").first()
    return transaction is not None

# Main entry point
if __name__ == "__main__":
    app.run(debug=True)
