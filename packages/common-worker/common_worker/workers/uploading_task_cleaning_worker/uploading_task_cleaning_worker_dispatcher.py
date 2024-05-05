from .uploading_task_cleaning_worker import UploadingTaskCleaningTaskWorker
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from api_client.uploading_task_api_client import UploadingTaskAPI
from concurrent.futures import ProcessPoolExecutor
from utils.logger import DefaultLogger
import time


class UploadingTaskCleaningWorkerDispatcher(TaskWorkerDispatcherBase):
    def __init__(self, uploading_task_api: UploadingTaskAPI,
        uploading_task_cleaning_worker: UploadingTaskCleaningTaskWorker, task_dispatch_interval: int, object_type: str):
        self.__uploading_task_api = uploading_task_api
        self.__uploading_task_cleaning_worker = uploading_task_cleaning_worker
        self.__task_dispatch_interval = task_dispatch_interval
        self.__object_type = object_type

    def dispatch(self, executor: ProcessPoolExecutor):
        try:
            self.__try_dispatch(executor)
        except Exception as e:
            DefaultLogger().error(f"Failed to dispatch {self.__object_type} creation task this time: {e}")

    def __try_dispatch(self, executor: ProcessPoolExecutor):
        DefaultLogger().info(f"Dispatching and executing {self.__object_type} uploading task cleaning tasks")
        DefaultLogger().info(f"Trying to get finished/failed/expired {self.__object_type} uploading tasks")
        task_info_list = self.__uploading_task_api.get_expired_uploading_task()
        DefaultLogger().info(f"Fetched expired {self.__object_type} uploading tasks: {[task_info.task_id for task_info in task_info_list]}")

        for task_info in task_info_list:
            DefaultLogger().info(f"{self.__object_type} uploading task to cleanup: {task_info.task_id}")
            executor.submit(self.__uploading_task_cleaning_worker.execute, task_info)
            time.sleep(self.__task_dispatch_interval)
