from flask import Flask, render_template, request, redirect
import mysql.connector

app = Flask(__name__)

# ------------------------
# MySQL connection
# ------------------------
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="prasad1234$",
    database="devotional"
)

cursor = db.cursor(dictionary=True)

# ------------------------
# Routes
# ------------------------

@app.route('/')
def home():
    return render_template('home.html')

# --------- Pooja Routes ---------
@app.route('/pooja')
def pooja():
    cursor.execute("SELECT * FROM poojas")
    poojas = cursor.fetchall()
    return render_template('pooja.html', poojas=poojas)

@app.route('/add_pooja', methods=['GET', 'POST'])
def add_pooja():
    if request.method == 'POST':
        sql = "INSERT INTO poojas (head_name, pooja_date, pooja_time, phone_number, location, near_landmark, pincode) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        values = (
            request.form['head_name'],
            request.form['pooja_date'],
            request.form['pooja_time'],
            request.form['phone_number'],
            request.form['location'],
            request.form['near_landmark'],
            request.form['pincode']
        )
        cursor.execute(sql, values)
        db.commit()
        return redirect('/pooja')
    return render_template('add_pooja.html')

# --------- Biksha Routes ---------
@app.route('/biksha')
def biksha():
    cursor.execute("SELECT * FROM biksha")
    bikshas = cursor.fetchall()
    return render_template('biksha.html', bikshas=bikshas)

@app.route('/add_biksha', methods=['GET', 'POST'])
def add_biksha():
    if request.method == 'POST':
        sql = "INSERT INTO biksha (swamy_name, biksha_date, biksha_time, phone_number, location, near_landmark, pincode) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        values = (
            request.form['swamy_name'],
            request.form['biksha_date'],
            request.form['biksha_time'],
            request.form['phone_number'],
            request.form['location'],
            request.form['near_landmark'],
            request.form['pincode']
        )
        cursor.execute(sql, values)
        db.commit()
        return redirect('/biksha')
    return render_template('add_biksha.html')


if __name__ == '__main__':
    app.run(debug=False)