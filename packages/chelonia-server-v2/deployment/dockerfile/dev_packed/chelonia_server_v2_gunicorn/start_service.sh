#!/bin/bash

SUPER_USER="${SUPER_USER:=admin}"
SUPER_USER_PASSWD="${SUPER_USER_PASSWD:=admin}"
GUNICORN_WORKERS="${GUNICORN_WORKERS:=10}"
CHELONIA_SERVER_V2_PATH="${CHELONIA_SERVER_V2_PATH:=/chelonia_server_v2}"

cd ${CHELONIA_SERVER_V2_PATH}
python manage.py create_database
python manage.py makemigrations chelonia_account
python manage.py migrate
python manage.py create_superuser_noninteractive --username $SUPER_USER --passwd $SUPER_USER_PASSWD
python manage.py makemigrations
python manage.py migrate
gunicorn chelonia_server_v2.wsgi -t 3600 --bind 0.0.0.0:8000 --workers=$GUNICORN_WORKERS --reload
