import os
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

# ------------------------
# Flask app initialization
# ------------------------
app = Flask(__name__)

# ------------------------
# Database configuration
# ------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://root:kVeQLihcFCQ01s876TZRS2uHQUGrSxGr@dpg-d3sijungi27c73dlpvfg-a.oregon-postgres.render.com/devotional"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ------------------------
# Database Models
# ------------------------
class Pooja(db.Model):
    __tablename__ = 'poojas'
    id = db.Column(db.Integer, primary_key=True)
    head_name = db.Column(db.String(100), nullable=False)
    pooja_date = db.Column(db.String(20), nullable=False)
    pooja_time = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Biksha(db.Model):
    __tablename__ = 'biksha'
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    biksha_date = db.Column(db.String(20), nullable=False)
    biksha_time = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Alpaharam(db.Model):
    __tablename__ = 'alpaharam'
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    biksha_date = db.Column(db.String(20), nullable=False)
    biksha_time = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

# ------------------------
# Language selection route
# ------------------------
# @app.route('/')
# def language():
#     return render_template('language.html')  # page with English / Telugu buttons

# ------------------------
# English routes
# ------------------------
@app.route('/')
def home():
    return render_template('home.html')

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
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_pooja)
        db.session.commit()
        return redirect('/pooja')
    return render_template('add_pooja.html')

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
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_biksha)
        db.session.commit()
        return redirect('/biksha')
    return render_template('add_biksha.html')

@app.route('/alpaharam')
def alpaharam():
    alpaharams = Alpaharam.query.all()
    return render_template('alpaharam.html', alpaharams=alpaharams)

@app.route('/add_alpaharam', methods=['GET', 'POST'])
def add_alpaharam():
    if request.method == 'POST':
        new_alpaharam = Alpaharam(
            swamy_name=request.form['swamy_name'],
            biksha_date=request.form['biksha_date'],
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_alpaharam)
        db.session.commit()
        return redirect('/alpaharam')
    return render_template('add_alpaharam.html')

# ------------------------
# Telugu routes
# ------------------------
# @app.route('/home_te')
# def home_te():
#     return render_template('home_te.html')

# @app.route('/pooja_te')
# def pooja_te():
#     poojas = Pooja.query.all()
#     return render_template('pooja_te.html', poojas=poojas)

# @app.route('/add_pooja_te', methods=['GET', 'POST'])
# def add_pooja_te():
#     if request.method == 'POST':
#         new_pooja = Pooja(
#             head_name=request.form['head_name'],
#             pooja_date=request.form['pooja_date'],
#             pooja_time=request.form['pooja_time'],
#             phone_number=request.form['phone_number'],
#             location=request.form['location'],
#             near_landmark=request.form.get('near_landmark'),
#             pincode=request.form.get('pincode')
#         )
#         db.session.add(new_pooja)
#         db.session.commit()
#         return redirect('/pooja_te')
#     return render_template('add_pooja_te.html')

# @app.route('/biksha_te')
# def biksha_te():
#     bikshas = Biksha.query.all()
#     return render_template('biksha_te.html', bikshas=bikshas)

# @app.route('/add_biksha_te', methods=['GET', 'POST'])
# def add_biksha_te():
#     if request.method == 'POST':
#         new_biksha = Biksha(
#             swamy_name=request.form['swamy_name'],
#             biksha_date=request.form['biksha_date'],
#             biksha_time=request.form['biksha_time'],
#             phone_number=request.form['phone_number'],
#             location=request.form['location'],
#             near_landmark=request.form.get('near_landmark'),
#             pincode=request.form.get('pincode')
#         )
#         db.session.add(new_biksha)
#         db.session.commit()
#         return redirect('/biksha_te')
#     return render_template('add_biksha_te.html')

# @app.route('/alpaharam_te')
# def alpaharam_te():
#     alpaharams = Alpaharam.query.all()
#     return render_template('alpaharam_te.html', alpaharams=alpaharams)

# @app.route('/add_alpaharam_te', methods=['GET', 'POST'])
# def add_alpaharam_te():
#     if request.method == 'POST':
#         new_alpaharam = Alpaharam(
#             swamy_name=request.form['swamy_name'],
#             biksha_date=request.form['biksha_date'],
#             biksha_time=request.form['biksha_time'],
#             phone_number=request.form['phone_number'],
#             location=request.form['location'],
#             near_landmark=request.form.get('near_landmark'),
#             pincode=request.form.get('pincode')
#         )
#         db.session.add(new_alpaharam)
#         db.session.commit()
#         return redirect('/alpaharam_te')
#     return render_template('add_alpaharam_te.html')

# ------------------------
# Run app
# ------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # creates tables if not exist

    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))