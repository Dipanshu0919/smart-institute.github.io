# Smartech Training Institute Website

Flask-based website for Smartech Training Institute with:
- Public landing page
- Enrollment form API
- Admin login and enrollment dashboard

## Tech Stack

- Python 3
- Flask
- SQLite
- HTML/CSS/JavaScript (templates + static assets)

## Run Locally

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your environment file:
   ```bash
   cp .env.example .env
   ```
   Then update values in `.env` as needed.
4. Start the app:
   ```bash
   python app.py
   ```
5. Open:
   - Website: `http://127.0.0.1:5000/`
   - Admin login: `http://127.0.0.1:5000/admin/login`

On first run, the app creates `enrollments.db` automatically.

## Project Structure

```text
.
├── app.py
├── .env.example
├── requirements.txt
├── templates/
│   ├── index.html
│   ├── admin_login.html
│   └── admin_dashboard.html
└── static/
    ├── style.css
    ├── admin.css
    ├── script.js
    ├── courses.json
    └── smartech logo.png
```

## Main Routes

- `GET /` — Landing page
- `POST /api/enroll` — Submit enrollment
- `GET/POST /admin/login` — Admin login
- `GET /dashboard` — Enrollment dashboard (protected)
- `POST /admin/delete/<id>` — Delete enrollment (protected)
- `GET /admin/api/enrollments` — Enrollment list JSON (protected)

## Notes

- Course cards/dropdown are loaded from `static/courses.json`.
- Admin authentication is session-based.
- Environment variables are loaded from `.env` via `python-dotenv`.
- Set strong values for `SECRET_KEY` and `ADMIN_PASSWORD` in production.
