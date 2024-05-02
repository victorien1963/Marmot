#!/bin/bash

OBJECT_STORE_BUCKET="${OBJECT_STORE_BUCKET:=BUCEKT}"
OBJECT_STORE_BUCKET_MOUNT_ROOT="${OBJECT_STORE_BUCKET_MOUNT_ROOT:=/mnt/${OBJECT_STORE_BUCKET}}"

echo "Try to mount S3-FS ... "

echo "Create directory ${OBJECT_STORE_BUCKET_MOUNT_ROOT} as mount point"
mkdir ${OBJECT_STORE_BUCKET_MOUNT_ROOT}

echo "Try to mount S3-FS ... "

if [ -z "${CUSTOM_OBJECT_STORE_ENDPOINT}" ]
then
  echo "Mount ${OBJECT_STORE_BUCKET} to ${OBJECT_STORE_BUCKET_MOUNT_ROOT} from AWS S3"
  nohup s3fs ${OBJECT_STORE_BUCKET} ${OBJECT_STORE_BUCKET_MOUNT_ROOT} &
  echo "Mount finished"
else
  echo "Mount ${OBJECT_STORE_BUCKET} to ${OBJECT_STORE_BUCKET_MOUNT_ROOT} from ${CUSTOM_OBJECT_STORE_ENDPOINT}"
  nohup s3fs ${OBJECT_STORE_BUCKET} ${OBJECT_STORE_BUCKET_MOUNT_ROOT} -o use_path_request_style -o url="${CUSTOM_OBJECT_STORE_ENDPOINT}" &
  echo "Mount finished"
fi

echo "Start service"
python main.py