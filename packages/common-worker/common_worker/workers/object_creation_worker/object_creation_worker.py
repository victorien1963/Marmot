from api_client.uploaded_object_management_api import UploadedObjectManagementAPI, UploadedObjectCreationInformation
from api_client.uploading_task_api_client import UploadingTaskAPI, UploadingTask
from object_store.copy_file import CopyFile
from object_store.get_file_size import GetFileSize
from utils.logger import DefaultLogger


class ObjectCreationWorker:
    def __init__(
        self, object_type: str, get_file_size_operation: GetFileSize, copy_file_operation: CopyFile,
        uploaded_object_management_api: UploadedObjectManagementAPI, object_uploading_task_api: UploadingTaskAPI,
    ):
        self.__object_type = object_type
        self.__get_file_size_operation = get_file_size_operation
        self.__copy_file_operation = copy_file_operation

        self.__uploaded_object_management_api = uploaded_object_management_api
        self.__object_uploading_task_api = object_uploading_task_api

    def execute(self, uploading_task: UploadingTask):
        try:
            DefaultLogger().info(f"Start {self.__object_type} creation task: {uploading_task.task_id}")

            DefaultLogger().info(f"Copy {self.__object_type} file from uploading path")
            self.__copy_file_operation.copy_file(
                source_path=uploading_task.upload_path, target_path=uploading_task.store_path)

            DefaultLogger().info(f"Get {self.__object_type} file size")
            file_size = self.__get_file_size_operation.get_file_size(uploading_task.store_path)

            object_creation_information = self.__get_object_creation_information(
                uploading_task=uploading_task, file_size=file_size)
            self.__uploaded_object_management_api.create_target_object(object_creation_information)
            self.__object_uploading_task_api.set_task_finished(uploading_task.task_id)
            DefaultLogger().info(f"Finish creating {self.__object_type}: {uploading_task.task_id}")

        except Exception as e:
            self.__object_uploading_task_api.set_task_failed(task_id=uploading_task.task_id, details=str(e))
            DefaultLogger().error(f"Failed to create {self.__object_type}: {e}")

    @staticmethod
    def __get_object_creation_information(uploading_task: UploadingTask, file_size: int) -> UploadedObjectCreationInformation:
        return UploadedObjectCreationInformation(
            task_id=uploading_task.task_id,
            name=uploading_task.filename,
            path=uploading_task.store_path,
            artifact_format=uploading_task.extension,
            artifact_size=file_size)
