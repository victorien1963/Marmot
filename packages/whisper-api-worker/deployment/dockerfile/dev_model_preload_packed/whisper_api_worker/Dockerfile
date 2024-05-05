FROM python:3.10 as requirements_generator

RUN python -m pip install poetry
WORKDIR /whisper_api_worker
COPY poetry.lock pyproject.toml /whisper_api_worker/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04

ENV PYTHON_VERSION=3.10

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -qq update \
    && apt-get -qq install --no-install-recommends \
    s3fs \
    python${PYTHON_VERSION} \
    python${PYTHON_VERSION}-venv \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN ln -s -f /usr/bin/python${PYTHON_VERSION} /usr/bin/python3 && \
    ln -s -f /usr/bin/python${PYTHON_VERSION} /usr/bin/python && \
    ln -s -f /usr/bin/pip3 /usr/bin/pip

WORKDIR /whisper_api_worker

COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt && \
    rm /requirements.txt

COPY deployment/dockerfile/dev_model_preload_packed/whisper_api_worker/start_service.sh /start_service.sh
COPY whisper_api_worker /whisper_api_worker/
RUN chmod 700 /start_service.sh
ENTRYPOINT ["/bin/sh", "/start_service.sh"]
