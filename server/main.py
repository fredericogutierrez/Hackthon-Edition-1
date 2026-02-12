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


@app.route("/api/mars")
def mars():
    insight_key = "umSMWOH941QEqsGesL8dzJyeX0MYJp3ZyfHye4BB"
    url = f"https://api.nasa.gov/insight_weather/?api_key={insight_key}&feedtype=json&ver=1.0"

    data = requests.get(url).json()
    sol = data["sol_keys"][-1]
    day = data[sol]

    return jsonify({
        "sol": sol,
        "estacao":day.get("Season"),
        "temperatura": {
            "media": day.get("AT", {}).get("av"),
            "max": day.get("AT", {}).get("mx"),
            "min": day.get("AT", {}).get("mn")
        },
        "pressao": {
            "media": day.get("PRE", {}).get("av"),
            "max": day.get("PRE", {}).get("mx"),
            "min": day.get("PRE", {}).get("mn")
        },
        "vento": {
            "media": day.get("HWS", {}).get("av"),
            "max": day.get("HWS", {}).get("mx"),
            "min": day.get("HWS", {}).get("mn")
        }
    })

if __name__ == '__main__':
  app.run(debug=True, port=8080)