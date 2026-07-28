# Copilot Instructions for `smart-institute.github.io`

## Build, test, and lint commands

This repository is a small Flask app with static assets and no configured automated test/lint tooling.

```bash
# install dependencies
pip install -r requirements.txt

# run the app locally (creates enrollments.db table on first start)
python app.py
```

Current status:
- **Build step:** none configured
- **Lint step:** none configured
- **Automated tests:** none configured (so single-test commands are not available)

## High-level architecture

- **Backend (`app.py`)**: one-file Flask server that serves the marketing page, accepts enrollments, and provides admin routes.
  - `GET /` renders `templates/index.html`
  - `POST /api/enroll` validates JSON payload and inserts into SQLite (`enrollments` table)
  - Admin auth is session-based (`/admin/login`, `/admin/logout`) and protected with `@login_required`
  - `GET /dashboard` renders enrollment records; `POST /admin/delete/<id>` removes one row
  - `GET /admin/api/enrollments` exposes the same records as JSON
- **Database (`enrollments.db`)**: SQLite file initialized by `init_db()` with one `enrollments` table.
- **Frontend templates (`templates/`)**:
  - `index.html` is the public landing page
  - `admin_login.html` and `admin_dashboard.html` are server-rendered admin views with flashed message blocks
- **Static assets (`static/`)**:
  - `style.css` (public page styles), `admin.css` (admin styles), `script.js` (UI interactions + enroll API call)
  - `courses.json` powers course filters/cards/modal and the form course dropdown

## Key conventions in this codebase

- **Canonical Flask files are in `templates/` and `static/`.** Root-level `index.html`, `style.css`, and `script.js` are alternate static copies; update intentionally and keep parity where needed.
- **Enrollment payload contract uses camelCase keys** from frontend to backend (`fullName`, `phone`, `email`, `course`, `message`) and backend normalizes/validates before DB insert.
- **Validation is duplicated on client and server** with matching user-facing messages; when rules change, update both `static/script.js` and `app.py`.
- **All enrollment persistence uses direct SQLite parameterized queries** against a single table; admin list/API both sort by `created_at DESC`.
- **Admin authorization state is session-flag based** (`session['admin_logged_in']`) and route protection should reuse the existing `login_required` decorator pattern.
- **Course UI is data-driven from JSON schema**: each course object is expected to include `id`, `category`, `tag`, `level`, `title`, `summary`, `meta`, and `syllabus` for rendering/filtering/modal navigation.
