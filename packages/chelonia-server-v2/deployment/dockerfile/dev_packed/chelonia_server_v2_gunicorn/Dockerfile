FROM python:3.11 as requirements_generator

RUN python -m pip install poetry
WORKDIR /chelonia_server_v2
COPY poetry.lock pyproject.toml /chelonia_server_v2/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM python:3.11

COPY ./chelonia_server_v2 /chelonia_server_v2
WORKDIR /chelonia_server_v2

COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt

COPY deployment/dockerfile/dev_packed/chelonia_server_v2_gunicorn/start_service.sh /chelonia_server_v2/start_service.sh
ENTRYPOINT ["/bin/bash", "start_service.sh"]