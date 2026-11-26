# Despina's portfolio: React frontend + Django admin API

```
frontend/   React + Vite site (public pages + /admin dashboard)
backend/    Django REST API (content, messages, login)
```

The public site paints instantly from cached/built-in content, then refreshes from the API.
Your admin lives at **yoursite.com/admin**.

## 1. Run it locally

### Backend (Windows)
```bat
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```
Edit `.env` and set ADMIN_USERNAME and ADMIN_PASSWORD, then:
```bat
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver
```
`seed_portfolio` fills your current projects, FAQ, experience, education, tools and socials, and creates
your admin login from `.env`. It never overwrites tables that already have data.

### Frontend
```bat
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. In development Vite proxies `/api` to Django on port 8000, so nothing else is needed.
Sign in at http://localhost:5173/admin.

## 2. What you can manage in /admin
Messages (read, reply by email or WhatsApp, delete) · Projects (image upload, card colour, links, hide/show) ·
Reviews · Experience · Education · FAQ · Social links · Tools · Contact details (location, phone, WhatsApp, email,
intro and about text). Every list supports add, edit, delete and move up/down.

## 3. Deploy

**Backend (Render / Railway):** root directory `backend`, build command `./build.sh`, start command `gunicorn config.wsgi`.
```
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=<long random string>
DJANGO_ALLOWED_HOSTS=your-api.onrender.com
CORS_ALLOWED_ORIGINS=https://despina-portfolio.vercel.app
CSRF_TRUSTED_ORIGINS=https://despina-portfolio.vercel.app
DATABASE_URL=<Postgres URL from your host>
ADMIN_USERNAME=...   ADMIN_PASSWORD=...
```
Uploaded images: free hosts wipe their disk on each deploy. Make a free Cloudinary account, add
`django-cloudinary-storage` to requirements.txt and set `CLOUDINARY_URL`. Without it, use image links instead of uploads.

**Frontend (Vercel):** root directory `frontend`, set `VITE_API_URL=https://your-api.onrender.com`.
`vercel.json` already handles page refreshes.

## Notes
- Contact messages are saved to your admin inbox (rate-limited, with a spam trap). Telegram is removed.
  If the API is unreachable the form offers "Send on WhatsApp instead".
- Images were converted to WebP (about 50 MB down to under 500 KB).
- Tests: `cd backend && python manage.py test api`
