import flask
import os
import json

app = flask.Flask(__name__, # Name of the main method
                  static_url_path='',
                  static_folder='public')  # host the files from the public folder

# redirects user to the index.html if none is provided
@app.route("/")
def redirect():
    return flask.redirect(location="/index.html")

@app.get("/auth")
def authenticate():
    return json.dumps({"message": "authenticate called"})

if __name__ == "__main__":  
    app.run(host="0.0.0.0", port=5500)