from flask import Flask, request
# from flask_react import React
from flask_cors import CORS
# from source.Utils import *

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    # Render the React page
    return {
      'resultStatus': 'SUCCESS',
      'message': "app.py default"
      }

@app.route("/get", methods=['GET'])
def Defaultget():
    # Render the React page
    return {
      'resultStatus': 'GET SUCCESS',
      'message': "app.py default"
      }


@app.route('/upload', methods=['POST'])
def upload_file():
    # file = request.files['file']
    # corn = request.form.get('corn')
    # soybean = request.form.get('soybean')
    file = request.files.get('file')
    corn = request.json.get('corn')
    soybean = request.json.get('soybean')
    print(file)
    print(corn)
    print(soybean)
    # predict(file)

    return 'File saved', 200


if __name__ == "__main__":
    app.run(debug=True)
