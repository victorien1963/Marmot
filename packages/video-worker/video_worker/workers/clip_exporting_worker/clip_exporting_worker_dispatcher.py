from .clip_exporting_worker import ClipExportingWorker
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from api_client.clip_exporting_task_api import ClipExportingTaskAPI
from concurrent.futures import ProcessPoolExecutor
from utils.logger import DefaultLogger
import time


class ClipExportingWorkerDispatcher(TaskWorkerDispatcherBase):
    def __init__(self, clip_exporting_task_api: ClipExportingTaskAPI,
        clip_exporting_worker: ClipExportingWorker, task_dispatch_interval: int):

        self.__clip_exporting_task_api = clip_exporting_task_api
        self.__clip_exporting_worker = clip_exporting_worker
        self.__task_dispatch_interval = task_dispatch_interval

    def dispatch(self, executor: ProcessPoolExecutor):
        try:
            self.__try_dispatch(executor)
        except Exception as e:
            DefaultLogger().error(f"Failed to dispatch clip exporting task this time: {e}")

    def __try_dispatch(self, executor: ProcessPoolExecutor):
        DefaultLogger().info(f"Dispatching and executing clip exporting tasks")
        DefaultLogger().info(f"Trying to get clip exporting tasks")
        task_info_list = self.__clip_exporting_task_api.get_created_clip_exporting_task()
        DefaultLogger().info(f"Fetched clip exporting tasks: {[task_info.task_id for task_info in task_info_list]}")

        for task_info in task_info_list:
            DefaultLogger().info(f"Create clip exporting task: {task_info.task_id}")
            self.__clip_exporting_task_api.set_task_processing(task_info.task_id)
            executor.submit(self.__clip_exporting_worker.execute, task_info)
            DefaultLogger().info(f"Wait for {self.__task_dispatch_interval}s to dispatch next task")
            time.sleep(self.__task_dispatch_interval)
