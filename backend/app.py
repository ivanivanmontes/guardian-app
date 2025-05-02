import requests
import datetime
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from dotenv import load_dotenv
import os

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY");

def geocode_address(address, api_key):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data['status'] == "OK":
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
    return None, None

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

client = MongoClient ("mongodb+srv://ivanmontes604:WaAnuHGwTHMdg8Rp@cluster0.mn7gll5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["myapp"]
users = db["users"]
reports = db["reports"]

# Register user
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if users.find_one({'username': data['username']}):
        return jsonify({'error': 'Username already exists'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    users.insert_one({
        "username": data['username'],
        "password": hashed_pw
    })
    return jsonify({'message': 'User registered successfully!'}), 201

# Login user
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users.find_one({'username': data['username']})

    if user and bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/test-db', methods=['GET'])
def test_db():
    try:
        # Just try to list the collections as a simple test
        collections = db.list_collection_names()
        return jsonify({
            'message': 'Database connection successful!',
            'collections': collections
        }), 200
    except Exception as e:
        return jsonify({
            'error': 'Failed to connect to the database',
            'details': str(e)
        }), 500

@app.route('/test-server', methods=['GET'])
def test_server():
    return jsonify({"message": "Hello from Flask!"}), 200

@app.route('/add-report', methods=['POST'])
def add_report():
    """
    Expected JSON body format:
    {
        "username": "user123",
        "title": "Streetlight out",
        "description": "The streetlight near my apartment is not working.",
        "address": "123 street",
        "tag": "crime"
    }
    """
    data = request.get_json()


    existing_report = reports.find_one({
        "username": data["username"],
        "title": data["title"],
        "description": data["description"],
        "address": data["address"],
        "tag": data["tag"],
        "time": datetime.datetime.now()
    })
    lat, lng = geocode_address(data["address"], GOOGLE_API_KEY)

    if lat is None or lng is None:
        return jsonify({"error": "Failed to geocode address"}), 400

    if existing_report:
        return jsonify({"error": "Report already exists"}), 400

    new_report = {
        "username": data["username"],
        "title": data["title"],
        "description": data.get("description", ""),
        "address": data["address"],
        "tag": data['tag'],
        "time": datetime.datetime.now(),
        "latitude": lat,
        "longitude": lng
    }

    reports.insert_one(new_report)
    return jsonify({"message": "Report added successfully!"}), 200

@app.route("/get-reports/<username>", methods=["GET"])
def get_reports(username: str):
    user_reports = reports.find({"username" : username})
    return dumps(list(user_reports)), 200

@app.route("/get-all-reports", methods=["GET"])
def get_all_reports():
    user_reports = reports.find()
    return dumps(list(user_reports)), 200


# Run server
if __name__ == '__main__':
    app.run(debug=True)