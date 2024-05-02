#!/bin/bash

MODEL_PATH=./model

if [ -z "$(ls -A ${MODEL_PATH})" ]; then
    git clone https://huggingface.co/Systran/faster-whisper-large-v2 ${MODEL_PATH}
else
    echo "Model directory already exist"
fi

docker compose up
