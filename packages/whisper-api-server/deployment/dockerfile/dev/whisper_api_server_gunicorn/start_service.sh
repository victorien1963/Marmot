#!/bin/bash

SUPER_USER="${SUPER_USER:=test}"
SUPER_USER_MAIL="${SUPER_USER_MAIL:=test@test.com}"
SUPER_USER_PASSWORD="${SUPER_USER_PASSWORD:=test}"
GUNICORN_WORKERS="${GUNICORN_WORKERS:=10}"
WHISPER_API_SERVER_PATH="${WHISPER_API_SERVER_PATH:=/whisper_api_server}"

cd ${WHISPER_API_SERVER_PATH}
python manage.py create_database
python manage.py migrate
python manage.py create_superuser_noninteractive --username $SUPER_USER --passwd $SUPER_USER_PASSWORD --email $SUPER_USER_MAIL
gunicorn whisper_api_server.wsgi -t 3600 --bind 0.0.0.0:8000 --workers=$GUNICORN_WORKERS --reload
