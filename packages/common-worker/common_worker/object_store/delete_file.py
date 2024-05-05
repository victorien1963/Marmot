from utils.logger import DefaultLogger
from utils.newline_remover import NewlineRemover
from .object_store_client_creator import ObjectStoreClientCreator


class DeleteFile:
    def __init__(self, bucket_name, object_store_client_creator: ObjectStoreClientCreator):
        self.__bucket_name = bucket_name
        self.__object_store_client_creator = object_store_client_creator

    def delete_file(self, file_path: str):
        try:
            self.__delete_file(file_path)
        except Exception as e:
            DefaultLogger().error(f"Failed to get size of {file_path}: {e}")
            raise e

    def __delete_file(self, file_path):
        DefaultLogger().info(f"Delete file {file_path}")
        client = self.__object_store_client_creator.create_object_store_client()
        response = client.delete_object(Bucket=self.__bucket_name, Key=file_path)
        DefaultLogger().info(f"Response of deleting {file_path}: {NewlineRemover.remove_newline(response)}")
