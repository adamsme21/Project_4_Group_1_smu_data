from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
# from modelHelper import ModelHelper
import numpy as np
import os

#init app and class
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Route to render index.html template
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")


# Route to render index.html template
@app.route("/census")
def census():
    # Return template and data
    return render_template("map.html")