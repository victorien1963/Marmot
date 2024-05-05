FROM python:3.11 as requirements_generator

RUN python -m pip install poetry
WORKDIR /video_worker
COPY poetry.lock pyproject.toml /video_worker/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM python:3.11

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -qq update \
    && apt-get -qq install --no-install-recommends \
    s3fs

WORKDIR /video_worker
COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt

COPY deployment/dockerfile/dev/start_service.sh /start_service.sh
RUN chmod 700 /start_service.sh
ENTRYPOINT ["/bin/sh", "/start_service.sh"]
