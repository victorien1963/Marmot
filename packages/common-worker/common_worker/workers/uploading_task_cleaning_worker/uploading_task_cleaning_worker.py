from api_client.uploading_task_api_client import UploadingTaskAPI, UploadingTask
from object_store.delete_file import DeleteFile
from utils.logger import DefaultLogger


class UploadingTaskCleaningTaskWorker:
    def __init__(self, delete_file_operation: DeleteFile, uploading_task_api: UploadingTaskAPI, object_type: str):
        self.__object_type = object_type
        self.__delete_file_operation = delete_file_operation
        self.__uploading_task_api = uploading_task_api

    def execute(self, uploading_task: UploadingTask):
        DefaultLogger().info(f"Start cleaning up {self.__object_type} uploading task: {uploading_task.task_id}")

        DefaultLogger().info(f"Delete uploaded {self.__object_type} file")
        self.__delete_file_operation.delete_file(uploading_task.upload_path)

        DefaultLogger().info(f"Delete task")
        self.__uploading_task_api.delete_task(uploading_task.task_id)

        DefaultLogger().info(f"Finish deleting task: {uploading_task.task_id}")
