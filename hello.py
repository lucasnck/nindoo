from flask import Flask
from flask import render_template
from flask import json
from flask import jsonify
from flask_pymongo import PyMongo
from flask import request

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'nindoo'
app.config["MONGO_URI"] = "mongodb://admin:admin123@ds235461.mlab.com:35461/nindoo"
mongo = PyMongo(app)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/about")
def about():
    return "About Page!"

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

@app.route('/search-weather', methods=['POST', 'GET'])
def saveweather():
    data = request.form['result']
    print(data) 
    user = mongo.db.users
    user.insert_one( { 'weather': data } )
    return json.dumps({'status':'OK','data':data})


if __name__ == '__main__':
    app.run(debug=True) 