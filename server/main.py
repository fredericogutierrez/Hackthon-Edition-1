from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/users', methods=['GET'])
def users():
  return jsonify(
    {
      "users": [
        'Alice',
        'Bob',
        'Charlie'
      ]
    }
  )

@app.route('/api/nasa/apod')
def get_apod():
  nasa_api_key = os.getenv('NASA_API_KEY', 'DEMO_KEY')
  url = f'https://api.nasa.gov/planetary/apod?api_key={nasa_api_key}'
  response = requests.get(url)
  return jsonify(response.json())

if __name__ == '__main__':
  app.run(debug=True, port=8080)