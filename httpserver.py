import flask
import os
import json

app = flask.Flask(__name__, # Name of the main method
                  static_url_path='',
                  static_folder='public')  # host the files from the public folder



if __name__ == "__main__":  
    app.run(host="0.0.0.0", port=5500)