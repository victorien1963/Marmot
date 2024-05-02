from whisper_api_server_client import WhisperAPIServerClient
from .task_worker import TaskWorker
from concurrent.futures import ProcessPoolExecutor
import settings
import time
from logger import DefaultLogger

class TaskWatcher:
    def __init__(self, whisper_api_server_client: WhisperAPIServerClient):
        self.__whisper_api_server_client = whisper_api_server_client

    def execute(self):
        with ProcessPoolExecutor(max_workers=settings.MAX_WORKERS) as executor:
            while True:
                DefaultLogger().info("Pull created task from whisper api server")
                task_list = self.__whisper_api_server_client.processing_task.get_all_created_task()
                self.__create_task(task_list=task_list, executor=executor)
                DefaultLogger().info(f"Wait {settings.TASK_SCAN_INTERVAL} for next scan")
                time.sleep(settings.TASK_SCAN_INTERVAL)

    def __create_task(self, task_list: list, executor: ProcessPoolExecutor):
        for created_task in task_list:
            DefaultLogger().info(f"Mark task {created_task['id']} processing")
            self.__whisper_api_server_client.processing_task.set_task_processing(created_task["id"])
            task_worker = TaskWorker(
                whisper_api_server_client=self.__whisper_api_server_client,
                processing_task=created_task
            )
            DefaultLogger().info(f"Scheduled task {created_task['id']}")
            executor.submit(task_worker.execute)
