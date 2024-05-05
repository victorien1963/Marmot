from .object_creation_worker import ObjectCreationWorker
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from api_client.uploading_task_api_client import UploadingTaskAPI
from concurrent.futures import ProcessPoolExecutor
from utils.logger import DefaultLogger
import time


class ObjectCreationWorkerDispatcher(TaskWorkerDispatcherBase):
    def __init__(self, uploading_task_api: UploadingTaskAPI, object_type: str,
        object_creation_worker: ObjectCreationWorker, task_dispatch_interval: int):
        self.__object_type = object_type
        self.__uploading_task_api = uploading_task_api
        self.__object_creation_worker = object_creation_worker
        self.__task_dispatch_interval = task_dispatch_interval

    def dispatch(self, executor: ProcessPoolExecutor):
        try:
            self.__try_dispatch(executor)
        except Exception as e:
            DefaultLogger().error(f"Failed to dispatch {self.__object_type} creation task this time: {e}")

    def __try_dispatch(self, executor: ProcessPoolExecutor):
        DefaultLogger().info(f"Dispatching and executing {self.__object_type} creation tasks")
        DefaultLogger().info(f"Trying to get {self.__object_type} uploading tasks")
        task_info_list = self.__uploading_task_api.get_uploaded_uploading_task()
        DefaultLogger().info(f"Fetched {self.__object_type} uploading tasks: {[task_info.task_id for task_info in task_info_list]}")

        for task_info in task_info_list:
            DefaultLogger().info(f"Create {self.__object_type} uploading task: {task_info.task_id}")
            self.__uploading_task_api.set_task_processing(task_info.task_id)
            executor.submit(self.__object_creation_worker.execute, task_info)
            DefaultLogger().info(f"Wait for {self.__task_dispatch_interval}s to dispatch next task")
            time.sleep(self.__task_dispatch_interval)
