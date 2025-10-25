import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

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
    pooja_type = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Biksha(db.Model):
    __tablename__ = 'biksha'
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    from_date = db.Column(db.String(20), nullable=False)
    to_date = db.Column(db.String(20), nullable=False)
    biksha_time = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Alpaharam(db.Model):
    __tablename__ = 'alpaharam'
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    from_date = db.Column(db.String(20), nullable=False)
    to_date = db.Column(db.String(20), nullable=False)
    biksha_time = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

# ------------------------
# Helper function to format dates as "25 October 2025"
# ------------------------
def format_date_long(date_value):
    if not date_value:
        return ""
    try:
        if isinstance(date_value, datetime):
            return date_value.strftime("%d %B %Y")
        return datetime.strptime(str(date_value), "%Y-%m-%d").strftime("%d %B %Y")
    except Exception:
        return str(date_value)

# ------------------------
# Light Mode Routes
# ------------------------
@app.route('/')
def homel():
    return render_template('homel.html', switch_url=url_for('home'))

@app.route('/poojal')
def poojal():
    poojas = Pooja.query.all()
    for p in poojas:
        p.pooja_date = format_date_long(p.pooja_date)
    return render_template('poojal.html', poojas=poojas, switch_url=url_for('pooja'))

@app.route('/add_poojal', methods=['GET', 'POST'])
def add_poojal():
    if request.method == 'POST':
        new_pooja = Pooja(
            head_name=request.form['head_name'],
            pooja_date=request.form['pooja_date'],
            pooja_time=request.form['pooja_time'],
            pooja_type=request.form.get('poojatype'),
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_pooja)
        db.session.commit()
        return redirect(url_for('poojal'))
    return render_template('add_poojal.html', switch_url=url_for('add_pooja'))

@app.route('/bikshal')
def bikshal():
    bikshas = Biksha.query.all()
    for b in bikshas:
        b.from_date_str = format_date_long(b.from_date)
        b.to_date_str = format_date_long(b.to_date)
    return render_template('bikshal.html', bikshas=bikshas, switch_url=url_for('biksha'))

@app.route('/add_bikshal', methods=['GET', 'POST'])
def add_bikshal():
    if request.method == 'POST':
        from_date = request.form['from_date']
        to_date = request.form.get('to_date') or from_date
        new_biksha = Biksha(
            swamy_name=request.form['swamy_name'],
            from_date=from_date,
            to_date=to_date,
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_biksha)
        db.session.commit()
        return redirect(url_for('bikshal'))
    return render_template('add_bikshal.html', switch_url=url_for('add_biksha'))

@app.route('/alpaharaml')
def alpaharaml():
    alpaharams = Alpaharam.query.all()
    for a in alpaharams:
        a.from_date_str = format_date_long(a.from_date)
        a.to_date_str = format_date_long(a.to_date)
    return render_template('alpaharaml.html', alpaharams=alpaharams, switch_url=url_for('alpaharam'))

@app.route('/add_alpaharaml', methods=['GET', 'POST'])
def add_alpaharaml():
    if request.method == 'POST':
        from_date = request.form['from_date']
        to_date = request.form.get('to_date') or from_date
        new_alpaharam = Alpaharam(
            swamy_name=request.form['swamy_name'],
            from_date=from_date,
            to_date=to_date,
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_alpaharam)
        db.session.commit()
        return redirect(url_for('alpaharaml'))
    return render_template('add_alpaharaml.html', switch_url=url_for('add_alpaharam'))

# ------------------------
# Dark Mode Routes
# ------------------------
@app.route('/home')
def home():
    return render_template('home.html', switch_url=url_for('homel'))

@app.route('/pooja')
def pooja():
    poojas = Pooja.query.all()
    for p in poojas:
        p.pooja_date = format_date_long(p.pooja_date)
    return render_template('pooja.html', poojas=poojas, switch_url=url_for('poojal'))

@app.route('/add_pooja', methods=['GET', 'POST'])
def add_pooja():
    if request.method == 'POST':
        new_pooja = Pooja(
            head_name=request.form['head_name'],
            pooja_date=request.form['pooja_date'],
            pooja_time=request.form['pooja_time'],
            pooja_type=request.form.get('poojatype'),
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_pooja)
        db.session.commit()
        return redirect(url_for('pooja'))
    return render_template('add_pooja.html', switch_url=url_for('add_poojal'))

@app.route('/biksha')
def biksha():
    bikshas = Biksha.query.all()
    for b in bikshas:
        b.from_date_str = format_date_long(b.from_date)
        b.to_date_str = format_date_long(b.to_date)
    return render_template('biksha.html', bikshas=bikshas, switch_url=url_for('bikshal'))

@app.route('/add_biksha', methods=['GET', 'POST'])
def add_biksha():
    if request.method == 'POST':
        from_date = request.form['from_date']
        to_date = request.form.get('to_date') or from_date
        new_biksha = Biksha(
            swamy_name=request.form['swamy_name'],
            from_date=from_date,
            to_date=to_date,
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_biksha)
        db.session.commit()
        return redirect(url_for('biksha'))
    return render_template('add_biksha.html', switch_url=url_for('bikshal'))

@app.route('/alpaharam')
def alpaharam():
    alpaharams = Alpaharam.query.all()
    for a in alpaharams:
        a.from_date_str = format_date_long(a.from_date)
        a.to_date_str = format_date_long(a.to_date)
    return render_template('alpaharam.html', alpaharams=alpaharams, switch_url=url_for('alpaharaml'))

@app.route('/add_alpaharam', methods=['GET', 'POST'])
def add_alpaharam():
    if request.method == 'POST':
        from_date = request.form['from_date']
        to_date = request.form.get('to_date') or from_date
        new_alpaharam = Alpaharam(
            swamy_name=request.form['swamy_name'],
            from_date=from_date,
            to_date=to_date,
            biksha_time=request.form['biksha_time'],
            phone_number=request.form['phone_number'],
            location=request.form['location'],
            near_landmark=request.form.get('near_landmark'),
            pincode=request.form.get('pincode')
        )
        db.session.add(new_alpaharam)
        db.session.commit()
        return redirect(url_for('alpaharam'))
    return render_template('add_alpaharam.html', switch_url=url_for('alpaharaml'))

# ------------------------
# Run app
# ------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))