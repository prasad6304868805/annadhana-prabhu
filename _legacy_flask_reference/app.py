import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
from sqlalchemy.exc import OperationalError

# ---------- Basic app ----------
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev_secret_change_me")

# ---------- Database configuration ----------
# Prefer environment DATABASE_URL (Render). Fallback to local sqlite file for safety.
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "sqlite:///dev_local.db"
)

# Ensure modern SQLAlchemy URL for psycopg: keep prefix postgresql+psycopg
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Use pool_pre_ping to avoid errors from closed connections
db = SQLAlchemy(app, engine_options={"pool_pre_ping": True})

# ---------- Logging ----------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("annadhana")

# ---------- Models ----------
class Pooja(db.Model):
    __tablename__ = "poojas"
    id = db.Column(db.Integer, primary_key=True)
    head_name = db.Column(db.String(100), nullable=False)
    # Keep existing DB string column to remain compatible with your existing data
    pooja_date = db.Column(db.String(20), nullable=False)
    pooja_time = db.Column(db.String(20), nullable=False)
    pooja_type = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Biksha(db.Model):
    __tablename__ = "biksha"
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    from_date = db.Column(db.Date, nullable=False)
    to_date = db.Column(db.Date, nullable=False)
    biksha_time = db.Column(db.Time, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

class Alpaharam(db.Model):
    __tablename__ = "alpaharam"
    id = db.Column(db.Integer, primary_key=True)
    swamy_name = db.Column(db.String(100), nullable=False)
    from_date = db.Column(db.Date, nullable=False)
    to_date = db.Column(db.Date, nullable=False)
    biksha_time = db.Column(db.Time, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    near_landmark = db.Column(db.String(100), nullable=True)
    pincode = db.Column(db.String(10), nullable=True)

# ---------- Helpers ----------
def format_date_long(date_value):
    """Accepts str or date and returns 'DD Month YYYY' (eg. '14 November 2025')."""
    if not date_value:
        return ""
    try:
        if isinstance(date_value, date):
            return date_value.strftime("%d %B %Y")
        # try parse YYYY-MM-DD
        return datetime.strptime(str(date_value).strip(), "%Y-%m-%d").strftime("%d %B %Y")
    except Exception:
        # If parsing fails, return original
        return str(date_value)

def safe_db_session():
    """Attempt a trivial DB operation to determine if DB is reachable."""
    try:
        # simple query that doesn't assume table exists
        db.session.execute("SELECT 1")
        return True
    except OperationalError as e:
        logger.error("Database not reachable: %s", e)
        return False

# ---------- Routes ----------
@app.route("/")
def index():
    # simple home page; toggle to dark/light templates like before
    return render_template("home.html")

# Light-mode style page route (homel)
@app.route("/homel")
def homel():
    return render_template("homel.html")

# Dark-mode home
@app.route("/home")
def home():
    return render_template("home.html")

# ----- Pooja (dark) -----
@app.route("/pooja")
def pooja():
    # If DB unreachable, fall back to empty list but keep the site up.
    if not safe_db_session():
        flash("Database unreachable — showing no entries.", "warning")
        return render_template("pooja.html", poojas=[], switch_url=url_for("homel"))

    # fetch all rows (pooja_date stored as varchar in your DB)
    all_poojas = Pooja.query.all()
    valid_poojas = []
    today = date.today()

    for p in all_poojas:
        try:
            parsed = datetime.strptime(p.pooja_date.strip(), "%Y-%m-%d").date()
        except Exception:
            # skip invalid formats
            continue
        if parsed >= today:
            valid_poojas.append(p)

    # sort desc by date
    valid_poojas.sort(key=lambda x: datetime.strptime(x.pooja_date.strip(), "%Y-%m-%d").date(), reverse=True)
    for p in valid_poojas:
        p.pooja_date = format_date_long(p.pooja_date)

    return render_template("pooja.html", poojas=valid_poojas, switch_url=url_for("homel"))

@app.route("/poojal")
def poojal():
    # same as pooja but for light mode route
    if not safe_db_session():
        flash("Database unreachable — showing no entries.", "warning")
        return render_template("poojal.html", poojas=[], switch_url=url_for("home"))

    all_poojas = Pooja.query.all()
    valid_poojas = []
    today = date.today()

    for p in all_poojas:
        try:
            parsed = datetime.strptime(p.pooja_date.strip(), "%Y-%m-%d").date()
        except Exception:
            continue
        if parsed >= today:
            valid_poojas.append(p)

    valid_poojas.sort(key=lambda x: datetime.strptime(x.pooja_date.strip(), "%Y-%m-%d").date(), reverse=True)
    for p in valid_poojas:
        p.pooja_date = format_date_long(p.pooja_date)

    return render_template("poojal.html", poojas=valid_poojas, switch_url=url_for("home"))

# Add Pooja (both analogs)
@app.route("/add_pooja", methods=["GET", "POST"])
def add_pooja():
    if request.method == "POST":
        # Basic validation left minimal; you can expand
        new_pooja = Pooja(
            head_name=request.form.get("head_name", "").strip(),
            pooja_date=request.form.get("pooja_date", "").strip(),  # keep as string for DB schema compatibility
            pooja_time=request.form.get("pooja_time", "").strip(),
            pooja_type=request.form.get("pooja_type"),
            phone_number=request.form.get("phone_number", "").strip(),
            location=request.form.get("location", "").strip(),
            near_landmark=request.form.get("near_landmark"),
            pincode=request.form.get("pincode")
        )
        db.session.add(new_pooja)
        db.session.commit()
        flash("Pooja added.", "success")
        return redirect(url_for("pooja"))
    return render_template("add_pooja.html", switch_url=url_for("pooja"))

# ----- Biksha -----
@app.route("/biksha")
def biksha():
    if not safe_db_session():
        flash("Database unreachable — showing no entries.", "warning")
        return render_template("biksha.html", bikshas=[], switch_url=url_for("homel"))

    today = date.today()
    # Biksha model uses Date columns — SQLAlchemy will compare properly assuming DB has date fields.
    try:
        bikshas = Biksha.query.filter(Biksha.to_date >= today).order_by(Biksha.from_date.desc()).all()
    except Exception as e:
        logger.error("Biksha query failed: %s", e)
        bikshas = []

    for b in bikshas:
        b.from_date_str = format_date_long(b.from_date)
        b.to_date_str = format_date_long(b.to_date)
    return render_template("biksha.html", bikshas=bikshas, switch_url=url_for("homel"))

@app.route("/add_biksha", methods=["GET", "POST"])
def add_biksha():
    if request.method == "POST":
        try:
            from_date = datetime.strptime(request.form["from_date"], "%Y-%m-%d").date()
            to_date = datetime.strptime(request.form.get("to_date", request.form["from_date"]), "%Y-%m-%d").date()
            biksha_time = datetime.strptime(request.form["biksha_time"], "%H:%M").time()
        except Exception:
            flash("Invalid date/time format. Use YYYY-MM-DD and HH:MM.", "danger")
            return redirect(url_for("add_biksha"))

        if to_date < from_date:
            flash("To Date cannot be earlier than From Date.", "warning")
            return redirect(url_for("add_biksha"))

        new_b = Biksha(
            swamy_name=request.form["swamy_name"],
            from_date=from_date,
            to_date=to_date,
            biksha_time=biksha_time,
            phone_number=request.form.get("phone_number", ""),
            location=request.form.get("location", ""),
            near_landmark=request.form.get("near_landmark"),
            pincode=request.form.get("pincode")
        )
        db.session.add(new_b)
        db.session.commit()
        flash("Biksha added.", "success")
        return redirect(url_for("biksha"))
    return render_template("add_biksha.html", switch_url=url_for("biksha"))

# ----- Alpaharam -----
@app.route("/alpaharam")
def alpaharam():
    if not safe_db_session():
        flash("Database unreachable — showing no entries.", "warning")
        return render_template("alpaharam.html", alpaharams=[], switch_url=url_for("homel"))

    today = date.today()
    try:
        alpaharams = Alpaharam.query.filter(Alpaharam.to_date >= today).order_by(Alpaharam.from_date.desc()).all()
    except Exception as e:
        logger.error("Alpaharam query failed: %s", e)
        alpaharams = []

    for a in alpaharams:
        a.from_date_str = format_date_long(a.from_date)
        a.to_date_str = format_date_long(a.to_date)
    return render_template("alpaharam.html", alpaharams=alpaharams, switch_url=url_for("homel"))

@app.route("/add_alpaharam", methods=["GET", "POST"])
def add_alpaharam():
    if request.method == "POST":
        try:
            from_date = datetime.strptime(request.form["from_date"], "%Y-%m-%d").date()
            to_date = datetime.strptime(request.form.get("to_date", request.form["from_date"]), "%Y-%m-%d").date()
            biksha_time = datetime.strptime(request.form["biksha_time"], "%H:%M").time()
        except Exception:
            flash("Invalid date/time format. Use YYYY-MM-DD and HH:MM.", "danger")
            return redirect(url_for("add_alpaharam"))

        if to_date < from_date:
            flash("To Date cannot be earlier than From Date.", "warning")
            return redirect(url_for("add_alpaharam"))

        new_a = Alpaharam(
            swamy_name=request.form["swamy_name"],
            from_date=from_date,
            to_date=to_date,
            biksha_time=biksha_time,
            phone_number=request.form.get("phone_number", ""),
            location=request.form.get("location", ""),
            near_landmark=request.form.get("near_landmark"),
            pincode=request.form.get("pincode")
        )
        db.session.add(new_a)
        db.session.commit()
        flash("Alpaharam added.", "success")
        return redirect(url_for("alpaharam"))
    return render_template("add_alpaharam.html", switch_url=url_for("alpaharam"))

# ---------- Start ----------
if __name__ == "__main__":
    # Create tables only in local / dev mode. In production with an existing DB, avoid destructive calls.
    try:
        if "sqlite" in DATABASE_URL:
            with app.app_context():
                db.create_all()
                logger.info("Database (sqlite) tables created.")
    except Exception as e:
        logger.error("Error creating tables: %s", e)

    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
