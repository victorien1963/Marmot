from utils.logger import DefaultLogger
from .object_store_client_creator import ObjectStoreClientCreator


class CopyFile:
    def __init__(self, bucket_name, object_store_client_creator: ObjectStoreClientCreator):
        self.__bucket_name = bucket_name
        self.__object_store_client_creator = object_store_client_creator

    def copy_file(self, source_path, target_path):
        try:
            self.__copy_file(source_path=source_path, target_path=target_path)
        except Exception as e:
            DefaultLogger().error(f"Failed to copy file from {source_path} to {target_path}: {e}")
            raise e

    def __copy_file(self, source_path, target_path):
        DefaultLogger().info(f"Copy file from {source_path} to {target_path}")
        client = self.__object_store_client_creator.create_resource_client()
        copy_source = {
            "Bucket": self.__bucket_name,
            "Key": source_path
        }
        client.copy(copy_source, self.__bucket_name, target_path)
        DefaultLogger().info(f"Finished saving {target_path}.")
