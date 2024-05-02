import boto3


class ObjectStoreClientCreator:
    def __init__(self, object_store_type: str, endpoint: str = ""):
        self.__object_store_type = object_store_type
        self.__endpoint = endpoint

    def create_object_store_client(self):
        if self.__object_store_type == "S3":
            client = boto3.client("s3")
        elif self.__object_store_type == "MINIO":
            client = boto3.client(
                service_name="s3", endpoint_url=self.__endpoint,
                aws_session_token=None,
                config=boto3.session.Config(signature_version='s3v4')
            )
        else:
            raise ValueError(f"Unknown object store type: {self.__object_store_type}")

        return client

    def create_resource_client(self):
        if self.__object_store_type == "S3":
            client = boto3.resource("s3").meta.client
        elif self.__object_store_type == "MINIO":
            client = boto3.resource(
                service_name="s3", endpoint_url=self.__endpoint,
                aws_session_token=None,
                config=boto3.session.Config(signature_version='s3v4')
            ).meta.client

        else:
            raise ValueError(f"Unknown object store type: {self.__object_store_type}")

        return client
