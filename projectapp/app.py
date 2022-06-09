from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
from modelHelper import ModelHelper
import numpy as np
import os

#init app and class
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelHelper = ModelHelper()

# Route to render index.html template
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

# Route to render index.html template
@app.route("/dashboard")
def dashboard():
    # Return template and data
    return render_template("dashboard.html")

# Route to render index.html template
@app.route("/map")
def maps():
    # Return template and data
    return render_template("map.html")

# Route to render index.html template
@app.route("/census")
def census():
    # Return template and data
    return render_template("census.html")

@app.route("/prediction")
def prediction():
    # Return template and data
    return render_template("prediction.html")

@app.route("/writeup")
def writeup():
    # Return template and data
    return render_template("writeup.html")

@app.route("/aboutus")
def aboutus():
    # Return template and data
    return render_template("aboutus.html")

@app.route("/sourcedata")
def data():
    # Return template and data
    return render_template("sourcedata.html")

@app.route("/workscited")
def workscited():
    # Return template and data
    return render_template("workscited.html")

# POST REQUEST LISTENER
@app.route("/makePredictions", methods=["POST"])
def makePrediction():
    content = request.json["data"]
    print(content)

    
    # parse
    county = (content["county"])
    hoa = (content["hoa"])
    city = (content["city"])
    squarefeet = (content["squarefeet"])
    beds = (content["beds"])
    baths = (content["baths"])

    prediction = modelHelper.makePredictions(county, hoa, city, squarefeet, beds, baths)
    print(prediction)

    return(jsonify({"ok": True , "prediction":prediction}))

    
#############################################################

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)