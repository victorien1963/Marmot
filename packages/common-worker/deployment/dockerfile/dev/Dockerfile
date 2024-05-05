FROM python:3.11 as requirements_generator

RUN python -m pip install poetry
WORKDIR /common_worker
COPY poetry.lock pyproject.toml /common_worker/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM python:3.11

WORKDIR /common_worker
COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt

ENTRYPOINT ["sleep", "infinity"]
