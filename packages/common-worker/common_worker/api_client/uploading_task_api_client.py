from utils.logger import DefaultLogger
from .api_client_base import APIClientBase


class _TaskStatus:
    UPLOADED = "UPLOADED"
    MOVING = "MOVING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class UploadingTask:
    def __init__(self, task_id: str, upload_link: str, upload_path: str, store_path: str, task_status: str, description: str, filename: str, extension: str):
        self.task_id = task_id
        self.upload_link = upload_link
        self.upload_path = upload_path
        self.store_path = store_path
        self.task_status = task_status
        self.description = description
        self.filename = filename
        self.extension = extension


class UploadingTaskParser:
    def parse_list(self, task_info_list: list[dict]) -> list[UploadingTask]:
        task_list = list()

        for task_info in task_info_list:
            task_list.append(self.parse(task_info))

        return task_list

    @staticmethod
    def parse(task_info_dict):
        return UploadingTask(
            task_id=task_info_dict["task_id"],
            upload_link=task_info_dict["upload_link"],
            upload_path=task_info_dict["upload_path"],
            store_path=task_info_dict["store_path"],
            task_status=task_info_dict["task_status"],
            description=task_info_dict["description"],
            filename=task_info_dict["filename"],
            extension=task_info_dict["extension"]
        )


class UploadingTaskAPI(APIClientBase):
    def __init__(self, url):
        super().__init__(url)
        self.__expired_task_url = f"{self._url}expired"

    def delete_task(self, task_id):
        DefaultLogger().info("Delete uploading task")
        self.delete(f"{self._url}{task_id}/")

    def get_uploaded_uploading_task(self) -> list[UploadingTask]:
        DefaultLogger().info("Getting uploaded uploading workers")
        payload = {'task_status': _TaskStatus.UPLOADED}
        return UploadingTaskParser().parse_list(self.get_by_condition(payload).get("data", []))

    def get_expired_uploading_task(self) -> list[UploadingTask]:
        DefaultLogger().info("Getting expired uploading workers")
        return UploadingTaskParser().parse_list(self.get_by_url(f"{self.__expired_task_url}").get("data", []))

    def set_task_processing(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.MOVING)

    def set_task_finished(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FINISHED)

    def set_task_failed(self, task_id: str, details: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FAILED, details=details)

    def __set_task_status(self, task_id: str, status: str, details: str = ""):
        DefaultLogger().info(f"Set status of uploading task {task_id} to {status} with details {details}")
        payload = {'task_status': status, 'details': details}
        self.patch(self.__task_url(task_id), payload)

    def __task_url(self, task_id) -> str:
        return f"{self._url}{task_id}/"
