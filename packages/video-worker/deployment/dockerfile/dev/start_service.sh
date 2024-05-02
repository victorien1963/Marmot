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
  s3fs ${OBJECT_STORE_BUCKET} ${OBJECT_STORE_BUCKET_MOUNT_ROOT}
  echo "Mount finished"
else
  echo "Mount ${OBJECT_STORE_BUCKET} to ${OBJECT_STORE_BUCKET_MOUNT_ROOT} from ${CUSTOM_OBJECT_STORE_ENDPOINT}"
  s3fs ${OBJECT_STORE_BUCKET} ${OBJECT_STORE_BUCKET_MOUNT_ROOT} -o use_path_request_style -o url="${CUSTOM_OBJECT_STORE_ENDPOINT}"  -o dbglevel=info -f -o curldbg
  echo "Mount finished"
fi

# make container stay alive
sleep infinity
