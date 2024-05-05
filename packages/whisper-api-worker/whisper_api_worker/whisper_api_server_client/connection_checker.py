from .processing_task import ProcessingTask
from logger import DefaultLogger
import time


class WhisperApiInaccessible(Exception):
    def __init__(self, url):
        super().__init__(f"Whisper API server {url} is inaccessible.")


class ConnectionChecker:
    def __init__(self, url: str, retry_times: int, retry_wait: int):
        self.__url = url
        self.__processing_task = ProcessingTask(url)

        self.__retry_times = retry_times
        self.__retry_wait = retry_wait

    def execute(self):
        DefaultLogger().info("Trying to access the get all created task API to confirm the Whisper API server accessible.")

        result = False

        for index, _ in enumerate(range(self.__retry_times)):
            DefaultLogger().info(f"Trying to access the Whisper API server. Retry time: {index + 1}")
            result = self.__try_access_whisper_api_server()
            DefaultLogger().info(f"Wait for {self.__retry_wait} second for next retry")
            time.sleep(self.__retry_wait)

            if result is True:
                break

        self.__check_final_result(result)

    def __try_access_whisper_api_server(self):
        result = False

        try:
            self.__processing_task.get_all_created_task()
            result = True
        except Exception as e:
            DefaultLogger().error("Whisper API server inaccessible.")

        return result

    def __check_final_result(self, result):
        if result is True:
            DefaultLogger().info("Whisper API server accessible now.")
        else:
            DefaultLogger().error(f"Whisper API server is still inaccessible after {self.__retry_times} retries.")
            raise WhisperApiInaccessible(f"{self.__url}")
