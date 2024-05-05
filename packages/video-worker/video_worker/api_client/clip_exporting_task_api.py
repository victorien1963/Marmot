from utils.logger import DefaultLogger
from .api_client_base import APIClientBase
from typing import List


class _TaskStatus:
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class ClipExportingTask:
    def __init__(
        self,
        task_id: str, task_status: str, description: str,
        source_clip_id: str, start: int, end: int, path_to_export: str, exported_clip_expired_at: int,
        source_video_id: str,
        source_artifact_id: str, source_artifact_path: str, source_artifact_size: int, source_artifact_format: str
    ):
        self.task_id = task_id
        self.task_status = task_status
        self.description = description

        self.source_clip_id = source_clip_id
        self.start = start
        self.end = end
        self.path_to_export = path_to_export
        self.exported_clip_expired_at = exported_clip_expired_at

        self.source_video_id = source_video_id
        self.source_artifact_id = source_artifact_id
        self.source_artifact_path = source_artifact_path
        self.source_artifact_size = source_artifact_size
        self.source_artifact_format = source_artifact_format


class ClipExportingTaskParser:
    def parse_list(self, task_info_list: List[dict]) -> List[ClipExportingTask]:
        task_list = list()

        for task_info in task_info_list:
            task_list.append(self.parse(task_info))

        return task_list

    @staticmethod
    def parse(task_info_dict):
        return ClipExportingTask(
            task_id=task_info_dict["task_id"],
            task_status=task_info_dict["task_status"],
            description=task_info_dict["description"],

            source_clip_id=task_info_dict["source_clip"]["clip_id"],
            start=task_info_dict["source_clip"]["start"],
            end=task_info_dict["source_clip"]["end"],
            path_to_export=task_info_dict["path_to_export"],
            exported_clip_expired_at=task_info_dict["exported_clip_expired_at"],

            source_video_id=task_info_dict["source_clip"]["source_video"]["video_id"],
            source_artifact_id=task_info_dict["source_clip"]["source_video"]["source_artifact"]["artifact_id"],
            source_artifact_path=task_info_dict["source_clip"]["source_video"]["source_artifact"]["path"],
            source_artifact_size=task_info_dict["source_clip"]["source_video"]["source_artifact"]["artifact_size"],
            source_artifact_format=task_info_dict["source_clip"]["source_video"]["source_artifact"]["artifact_format"]
        )


class ClipExportingTaskAPI(APIClientBase):
    def __init__(self, url):
        super().__init__(url)
        self.__expired_task_url = f"{self._url}expired"

    def get_created_clip_exporting_task(self):
        DefaultLogger().info("Get created clip exporting task")
        payload = {'task_status': _TaskStatus.CREATED}
        return ClipExportingTaskParser().parse_list(self.get_by_condition(payload).get("data", []))

    def delete_task(self, task_id):
        DefaultLogger().info("Delete uploading task")
        self.delete(f"{self._url}{task_id}/")

    def set_task_processing(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.PROCESSING)

    def set_task_finished(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FINISHED)

    def set_task_failed(self, task_id: str, details: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FAILED, details=details)

    def __set_task_status(self, task_id: str, status: str, details: str = ""):
        DefaultLogger().info(f"Set status of exporting task {task_id} to {status} with details {details}")
        payload = {'task_status': status, 'details': details}
        self.patch(self.__task_url(task_id), payload)

    def __task_url(self, task_id) -> str:
        return f"{self._url}{task_id}/"
