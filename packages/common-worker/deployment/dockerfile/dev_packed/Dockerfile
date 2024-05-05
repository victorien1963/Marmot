FROM python:3.11 as requirements_generator

RUN python -m pip install poetry
WORKDIR /common_worker
COPY poetry.lock pyproject.toml /common_worker/
RUN python -m poetry export -f requirements.txt --output /requirements.txt

FROM python:3.11

COPY common_worker /common_worker
WORKDIR /common_worker
COPY --from=requirements_generator /requirements.txt /requirements.txt
RUN python -m pip install -r /requirements.txt

ENTRYPOINT ["python", "main.py"]
