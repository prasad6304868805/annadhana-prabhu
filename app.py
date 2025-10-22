import os
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# ------------------------
# Database configuration
# ------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = mysql.connector.connect(
    host=os.environ.get('DB_HOST'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASS'),
    database=os.environ.get('DB_NAME')
)
>>>>>>> 19ddf71 (Update app.py with Render database changes)

db = SQLAlchemy(app)

# ------------------------
# Models
# ------------------------
class Pooja(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    head_name = db.Column(db.String(100), nullable=False)
    pooja_date = db.Column(db.Date, nullable=False)
    pooja_time = db.Column(db.Time, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(200))
    pincode = db.Column(db.String(10))

class Biksha(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    biksha_date = db.Column(db.Date, nullable=False)
    biksha_time = db.Column(db.Time, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(200))
    pincode = db.Column(db.String(10))

# ------------------------
# Routes
# ------------------------
@app.route('/')
def home():
    return render_template('home.html')

# --------- Pooja Routes ---------
@app.route('/pooja')
def pooja():
    poojas = Pooja.query.all()
    return render_template('pooja.html', poojas=poojas)

@app.route('/add_pooja', methods=['GET', 'POST'])
def add_pooja():
    if request.method == 'POST':
        new_pooja = Pooja(
            head_name=request.form['head_name'],
            pooja_date=datetime.strptime(request.form['pooja_date'], '%Y-%m-%d'),
            pooja_time=datetime.strptime(request.form['pooja_time'], '%H:%M').time(),
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_pooja)
        db.session.commit()
        return redirect('/pooja')
    return render_template('add_pooja.html')

# --------- Biksha Routes ---------
@app.route('/biksha')
def biksha():
    bikshas = Biksha.query.all()
    return render_template('biksha.html', bikshas=bikshas)

@app.route('/add_biksha', methods=['GET', 'POST'])
def add_biksha():
    if request.method == 'POST':
        new_biksha = Biksha(
            swamy_name=request.form['swamy_name'],
            biksha_date=datetime.strptime(request.form['biksha_date'], '%Y-%m-%d'),
            biksha_time=datetime.strptime(request.form['biksha_time'], '%H:%M').time(),
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_biksha)
        db.session.commit()
        return redirect('/biksha')
    return render_template('add_biksha.html')

if __name__ == '__main__':
    app.run(debug=False)
