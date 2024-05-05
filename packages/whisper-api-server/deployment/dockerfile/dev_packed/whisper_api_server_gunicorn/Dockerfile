FROM python:3.10 as requirements_generator

RUN python -m pip install poetry
WORKDIR /whisper_api_server
COPY poetry.lock pyproject.toml /whisper_api_server/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM python:3.10

COPY ./whisper_api_server /whisper_api_server
WORKDIR /whisper_api_server

COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt

COPY deployment/dockerfile/dev_packed/whisper_api_server_gunicorn/start_service.sh /whisper_api_server/start_service.sh
ENTRYPOINT ["/bin/bash", "start_service.sh"]