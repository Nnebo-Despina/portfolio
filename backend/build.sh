#!/usr/bin/env bash
# Build step for Render / Railway. Start command: gunicorn config.wsgi
set -o errexit
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py seed_portfolio   # only fills EMPTY tables, safe to run on every deploy
