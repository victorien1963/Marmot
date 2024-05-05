from .processing_task import ProcessingTask
from .subtitle import Subtitle


class WhisperAPIServerClient:
    def __init__(self, url):
        self.__url = url
        self.processing_task = ProcessingTask(self.__url)
        self.subtitle = Subtitle(self.__url)
