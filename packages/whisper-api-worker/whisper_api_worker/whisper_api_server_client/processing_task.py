import requests
from typing import List, Dict
from logger import DefaultLogger


class _TaskStatus:
    FINISHED = "FINISHED"
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    FAILED = "FAILED"


class ProcessingTask:
    def __init__(self, url):
        self.__url = url
        self.__processing_task_url_base = f"{self.__url}/core/processing-task"

    def get_all_created_task(self) -> List[Dict]:
        try:
            payload = {'processing_status': _TaskStatus.CREATED}
            response = requests.get(self.__processing_task_url_base, params=payload)
            response.raise_for_status()
            DefaultLogger().info(f"Successfully retrieved tasks. Response of retrieving tasks from {self.__processing_task_url_base} : {response.text}")
            return response.json().get("data", [])
        except Exception as e:
            DefaultLogger().error(f"Error occur while retrieving tasks: {e}")
            raise e

    def set_task_processing(self, task_id: int):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.PROCESSING)

    def set_task_finished(self, task_id: int):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FINISHED)

    def set_task_failed(self, task_id: int, details: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FAILED, details=details)

    def __set_task_status(self, task_id: int, status: str, details: str=""):
        try:
            payload = {'processing_status': status, 'details': details}
            response = requests.patch(self.__processing_task_url(task_id), data=payload)
            response.raise_for_status()
            DefaultLogger().info(f"Response of making request to {self.__processing_task_url(task_id)} : {response.text}")
        except Exception as e:
            DefaultLogger().error(f"Error occur while making request to update task {task_id}: {e}")
            raise e

    def __processing_task_url(self, task_id) -> str:
        return f"{self.__processing_task_url_base}/{task_id}/"
