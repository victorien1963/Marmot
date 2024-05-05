import boto3
from django.conf import settings
from botocore.exceptions import ClientError
from uuid import uuid4
import logging
from enum import StrEnum


'''
Object store structure should be
-user
  |-video
  |-watermark
  |-transition-animation
  |-upload
  |-export
  |-temp
'''

class ObjectDirectory(StrEnum):
    VIDEO = 'video'
    WATERMARK = 'watermark'
    TRANSITION_ANIMATION = 'transition-animation'
    UPLOAD = 'upload'
    EXPORT = 'export'
    TEMP = 'temp'


class ObjectStore:
    def __init__(self):
        self.__client = self.__get_client()

    @staticmethod
    def __get_client():
        if settings.CUSTOM_OBJECT_STORE_TYPE == "S3":
            client = boto3.client("s3")
        elif settings.CUSTOM_OBJECT_STORE_TYPE == "MINIO":
            client = boto3.client(
                service_name="s3", endpoint_url=settings.CUSTOM_OBJECT_STORE_ENDPOINT,
                aws_session_token=None,
                config=boto3.session.Config(signature_version='s3v4')
            )
        else:
            raise ValueError(f"Unknown object store type: {settings.CUSTOM_OBJECT_STORE_TYPE}")

        return client

    def generate_upload_info(self, username: str, directory: ObjectDirectory, source_filename: str, extension: str) -> (str, str):
        unique_filename = str(uuid4())
        full_filename = f"{unique_filename}.{extension}"
        key_for_upload = f"{username}/{ObjectDirectory.UPLOAD}/{full_filename}"
        key_for_saving = f"{username}/{directory}/{full_filename}"

        try:
            upload_url = self.__client.generate_presigned_url(
                ClientMethod="put_object", Params={"Bucket": settings.OBJECT_STORE_BUCKET, "Key": key_for_upload}, ExpiresIn=settings.UPLOAD_EXPIRE
            )

            logging.info(f"Generate video upload link for {source_filename}.{extension}: {upload_url}")
        except ClientError as e:
            logging.exception(f"Cannot generate video upload link for {source_filename}.{extension}. Issue: {e}")
            raise

        return unique_filename, key_for_upload, key_for_saving, upload_url

    def generate_view_info(self, path: str):
        view_url = self.__client.generate_presigned_url(
            ClientMethod="get_object", Params={"Bucket": settings.OBJECT_STORE_BUCKET, "Key": path},
            ExpiresIn=settings.UPLOAD_EXPIRE
        )
        logging.info(f"Generate video viewing link for {path}: {view_url}")

        return view_url

    def generate_export_info(self, username: str, filename: str, extension: str) -> str:
        return f"{username}/{ObjectDirectory.EXPORT}/{filename}.{extension}"

    def generate_temp_file_path(self, username: str, filename: str, extension: str) -> str:
        return f"{username}/{ObjectDirectory.TEMP}/{filename}.{extension}"
