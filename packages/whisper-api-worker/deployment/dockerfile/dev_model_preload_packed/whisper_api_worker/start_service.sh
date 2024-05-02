#!/bin/bash

BUCKET_NAME="${BUCKET_NAME:=BUCEKT}"
BUCKET_MOUNT_ROOT="${BUCKET_MOUNT_ROOT:=/mnt/${BUCKET_NAME}}"

echo "Try to mount S3-FS ... "

echo "Create directory ${BUCKET_MOUNT_ROOT} as mount point"
mkdir ${BUCKET_MOUNT_ROOT}

echo "Try to mount S3-FS ... "

if [ -z "${CUSTOM_BUCKET_ENDPOINT}" ]
then
  echo "Mount ${BUCKET_NAME} to ${BUCKET_MOUNT_ROOT} from AWS S3"
  s3fs ${BUCKET_NAME} ${BUCKET_MOUNT_ROOT}
  echo "Mount finished"
else
  echo "Mount ${BUCKET_NAME} to ${BUCKET_MOUNT_ROOT} from ${CUSTOM_BUCKET_ENDPOINT}"
  s3fs ${BUCKET_NAME} ${BUCKET_MOUNT_ROOT} -o use_path_request_style -o url="${CUSTOM_BUCKET_ENDPOINT}"
  echo "Mount finished"
fi

echo "Start Whisper API Worker"
python3 main.py
