from .subtitle_generation_worker import SubtitleGenerationWorker
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from api_client.subtitle_generation_task_api import SubtitleGenerationTaskAPI
from concurrent.futures import ProcessPoolExecutor
from utils.logger import DefaultLogger
import time


class SubtitleGenerationWorkerDispatcher(TaskWorkerDispatcherBase):
    def __init__(self, subtitle_generation_task_api: SubtitleGenerationTaskAPI,
        subtitle_generation_worker: SubtitleGenerationWorker, task_dispatch_interval: int):

        self.__subtitle_generation_task_api = subtitle_generation_task_api
        self.__subtitle_generation_worker = subtitle_generation_worker
        self.__task_dispatch_interval = task_dispatch_interval

    def dispatch(self, executor: ProcessPoolExecutor):
        try:
            self.__try_dispatch(executor)
        except Exception as e:
            DefaultLogger().error(f"Failed to dispatch subtitle generation task this time: {e}")

    def __try_dispatch(self, executor: ProcessPoolExecutor):
        DefaultLogger().info(f"Dispatching and executing subtitle generation tasks")
        DefaultLogger().info(f"Trying to get subtitle generation tasks")
        task_info_list = self.__subtitle_generation_task_api.get_created_subtitle_generations_task()
        DefaultLogger().info(f"Fetched subtitle generation tasks: {[task_info.task_id for task_info in task_info_list]}")

        for task_info in task_info_list:
            DefaultLogger().info(f"Create subtitle generation task: {task_info.task_id}")
            self.__subtitle_generation_task_api.set_task_processing(task_info.task_id)
            executor.submit(self.__subtitle_generation_worker.execute, task_info)
            DefaultLogger().info(f"Wait for {self.__task_dispatch_interval}s to dispatch next task")
            time.sleep(self.__task_dispatch_interval)
