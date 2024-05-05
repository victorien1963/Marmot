from concurrent.futures import ProcessPoolExecutor
import settings
import time
from utils.logger import DefaultLogger
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from typing import List

class TaskWatcher:
    def __init__(self, task_dispatcher_list: List[TaskWorkerDispatcherBase], task_scan_interval: int, task_dispatch_interval: int):
        self.__task_dispatcher_list = task_dispatcher_list
        self.__task_scan_interval = task_scan_interval
        self.__task_dispatch_interval = task_dispatch_interval

    def execute(self):
        with ProcessPoolExecutor(max_workers=settings.MAX_WORKERS) as executor:
            while True:
                DefaultLogger().info("Run task dispatcher")
                self.__execute_each_dispatcher(executor)
                DefaultLogger().info(f"Wait {self.__task_scan_interval}s for next scan")
                time.sleep(self.__task_scan_interval)

    def __execute_each_dispatcher(self, executor):
        for task_dispatcher in self.__task_dispatcher_list:
            task_dispatcher.dispatch(executor)
            time.sleep(self.__task_dispatch_interval)
            DefaultLogger().info(f"Wait for {self.__task_dispatch_interval}s to dispatch next task")
