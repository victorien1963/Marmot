import requests
from logger import DefaultLogger


class Subtitle:
    def __init__(self, url):
        self.__url = url

        self.__subtitle_url = f"{self.__url}/core/subtitle/"

    def add_subtitle_to_task(self, task_id: int, start: float, end: float, text: str):
        try:
            payload = {
                'processing_task': task_id,
                'start': start,
                'end': end,
                'text': text
            }

            response = requests.post(self.__subtitle_url, data=payload)
            response.raise_for_status()
            DefaultLogger().info(f"Added subtitle for {task_id}. Response of retrieving tasks from {self.__subtitle_url} : {response.text}")
        except Exception as e:
            DefaultLogger().error(f"Error occur while adding subtitle to task {task_id}: {e}")
            raise e
