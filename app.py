import os
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# ------------------------
# PostgreSQL configuration
# ------------------------
# Make sure DATABASE_URL is set in Render environment
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ------------------------
# Models
# ------------------------
class Pooja(db.Model):
    __tablename__ = 'poojas'
    id = db.Column(db.Integer, primary_key=True)
    head_name = db.Column(db.String(100))
    pooja_date = db.Column(db.String(20))
    pooja_time = db.Column(db.String(20))
    phone_number = db.Column(db.String(20))
    location = db.Column(db.String(200))
    near_landmark = db.Column(db.String(200))
    pincode = db.Column(db.String(20))

class Biksha(db.Model):
    __tablename__ = 'biksha'
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100))
    biksha_date = db.Column(db.String(20))
    biksha_time = db.Column(db.String(20))
    phone_number = db.Column(db.String(20))
    location = db.Column(db.String(200))
    near_landmark = db.Column(db.String(200))
    pincode = db.Column(db.String(20))

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
            pooja_date=request.form['pooja_date'],
            pooja_time=request.form['pooja_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form['near_landmark'],
            pincode=request.form['pincode']
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
            biksha_date=request.form['biksha_date'],
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form['near_landmark'],
            pincode=request.form['pincode']
        )
        db.session.add(new_biksha)
        db.session.commit()
        return redirect('/biksha')
    return render_template('add_biksha.html')


# ------------------------
# Run app
# ------------------------
if __name__ == '__main__':
    # On Render, use host='0.0.0.0' and port from environment
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)