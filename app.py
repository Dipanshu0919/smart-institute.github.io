import os
import sqlite3
from datetime import datetime
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'smartech-dev-secret-key-change-in-production')
app.config['ADMIN_EMAIL'] = os.getenv('ADMIN_EMAIL', 'admin@example.com')
app.config['ADMIN_PASSWORD'] = os.getenv('ADMIN_PASSWORD', 'change-me')

DATABASE = 'enrollments.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT NOT NULL,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            flash('Please log in to access the admin panel.', 'error')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/enroll', methods=['POST'])
def enroll():
    data = request.get_json()

    if not data:
        return jsonify({'success': False, 'message': 'No data provided'}), 400

    full_name = data.get('fullName', '').strip()
    phone = data.get('phone', '').strip()
    email = data.get('email', '').strip()
    course = data.get('course', '').strip()
    message = data.get('message', '').strip()

    if not full_name or len(full_name) < 2:
        return jsonify({'success': False, 'message': 'Please enter your name.'}), 400

    if not phone or not phone.isdigit() or len(phone) != 10:
        return jsonify({'success': False, 'message': 'Enter a valid 10-digit phone number.'}), 400

    if not email or '@' not in email:
        return jsonify({'success': False, 'message': 'Enter a valid email address.'}), 400

    if not course:
        return jsonify({'success': False, 'message': 'Please choose a course.'}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO enrollments (full_name, phone, email, course, message) VALUES (?, ?, ?, ?, ?)',
        (full_name, phone, email, course, message)
    )
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': "You're on the list — a counsellor will call you within one working day."})

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()

        if email == app.config['ADMIN_EMAIL'] and password == app.config['ADMIN_PASSWORD']:
            session['admin_logged_in'] = True
            session['admin_email'] = email
            flash('Welcome back, Admin!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials. Please try again.', 'error')

    return render_template('admin_login.html', year=datetime.now().year)

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('admin_login'))

@app.route('/dashboard')
def admin_dashboard():
    conn = get_db()
    enrollments = conn.execute(
        'SELECT * FROM enrollments ORDER BY created_at DESC'
    ).fetchall()
    conn.close()

    return render_template('admin_dashboard.html', enrollments=enrollments, year=datetime.now().year)

@app.route('/admin/delete/<int:id>', methods=['POST'])
@login_required
def delete_enrollment(id):
    conn = get_db()
    conn.execute('DELETE FROM enrollments WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    flash('Enrollment deleted successfully.', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/api/enrollments')
@login_required
def api_enrollments():
    conn = get_db()
    enrollments = conn.execute(
        'SELECT * FROM enrollments ORDER BY created_at DESC'
    ).fetchall()
    conn.close()

    return jsonify([dict(e) for e in enrollments])

if __name__ == '__main__':
    init_db()
    app.run(
        debug=os.getenv('FLASK_DEBUG', 'true').lower() == 'true',
        host='0.0.0.0',
        port=int(os.getenv('PORT', '5000'))
    )
