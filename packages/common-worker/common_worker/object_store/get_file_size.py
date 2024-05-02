from utils.logger import DefaultLogger
from utils.newline_remover import NewlineRemover
from .object_store_client_creator import ObjectStoreClientCreator


class GetFileSize:
    def __init__(self, bucket_name, object_store_client_creator: ObjectStoreClientCreator):
        self.__bucket_name = bucket_name
        self.__object_store_client_creator = object_store_client_creator

    def get_file_size(self, file_path: str) -> int:
        try:
            return self.__get_file_size(file_path)
        except Exception as e:
            DefaultLogger().error(f"Failed to get size of {file_path}: {e}")
            raise e

    def __get_file_size(self, file_path) -> int:
        DefaultLogger().info(f"Get file size of {file_path}")
        client = self.__object_store_client_creator.create_object_store_client()
        response = client.head_object(Bucket=self.__bucket_name, Key=file_path)
        DefaultLogger().info(f"Response of getting size of {file_path}: {NewlineRemover.remove_newline(response)}")
        return int(response['ContentLength'])
