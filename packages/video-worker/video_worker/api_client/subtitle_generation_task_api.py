from utils.logger import DefaultLogger
from .api_client_base import APIClientBase
from typing import List


class _TaskStatus:
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class SubtitleGenerationTask:
    def __init__(
        self,
        task_id: str, task_status: str, description: str,
        source_video_id: str,
        source_artifact_id: str, source_artifact_path: str, source_artifact_size: int, source_artifact_format: str,
        # OpenAI API parameters
        language: str, prompt: str, temperature: float, timestamp_granularities: List[str], response_format: str,
        temp_audio_file_path: str
    ):
        self.task_id = task_id
        self.task_status = task_status
        self.description = description

        self.source_video_id = source_video_id
        self.source_artifact_id = source_artifact_id
        self.source_artifact_path = source_artifact_path
        self.source_artifact_size = source_artifact_size
        self.source_artifact_format = source_artifact_format

        # OpenAI API parameters
        self.language = language
        self.prompt = prompt
        self.temperature = temperature
        self.timestamp_granularities = timestamp_granularities
        self.response_format = response_format

        self.temp_audio_file_path = temp_audio_file_path

    def __to_openai_parameter(self):
        return {
            "language": self.language if self.language is not None else None,
            "prompt": self.prompt if self.prompt is not None else None,
            "temperature": self.temperature if self.temperature is not None else None,
            "timestamp_granularities": self.timestamp_granularities,
            "response_format": self.response_format if self.response_format is not None else None,
        }


class SubtitleGenerationTaskParser:
    def parse_list(self, task_info_list: List[dict]) -> List[SubtitleGenerationTask]:
        task_list = list()

        for task_info in task_info_list:
            task_list.append(self.parse(task_info))

        return task_list

    @staticmethod
    def parse(task_info_dict):
        return SubtitleGenerationTask(
            task_id=task_info_dict["task_id"],
            task_status=task_info_dict["task_status"],
            description=task_info_dict["description"],

            source_video_id=task_info_dict["source_video"]["video_id"],
            source_artifact_id=task_info_dict["source_video"]["source_artifact"]["artifact_id"],
            source_artifact_path=task_info_dict["source_video"]["source_artifact"]["path"],
            source_artifact_size=task_info_dict["source_video"]["source_artifact"]["artifact_size"],
            source_artifact_format=task_info_dict["source_video"]["source_artifact"]["artifact_format"],

            # OpenAI API parameters
            language=task_info_dict["language"],
            prompt=task_info_dict["prompt"],
            temperature=task_info_dict["temperature"],
            timestamp_granularities=task_info_dict["timestamp_granularities"],
            response_format=task_info_dict["response_format"],

            temp_audio_file_path=task_info_dict["temp_audio_file_path"],
        )


class SubtitleGenerationTaskAPI(APIClientBase):
    def __init__(self, url):
        super().__init__(url)
        self.__expired_task_url = f"{self._url}expired"

    def get_created_subtitle_generations_task(self):
        DefaultLogger().info("Get created subtitle generations task")
        payload = {'task_status': _TaskStatus.CREATED}
        return SubtitleGenerationTaskParser().parse_list(self.get_by_condition(payload).get("data", []))

    def set_task_processing(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.PROCESSING)

    def set_task_finished(self, task_id: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FINISHED)

    def set_task_failed(self, task_id: str, details: str):
        self.__set_task_status(task_id=task_id, status=_TaskStatus.FAILED, details=details)

    def __set_task_status(self, task_id: str, status: str, details: str = ""):
        DefaultLogger().info(f"Set status of subtitle generation task {task_id} to {status} with details {details}")
        payload = {'task_status': status, 'details': details}
        self.patch(self.__task_url(task_id), payload)

    def __task_url(self, task_id) -> str:
        return f"{self._url}{task_id}/"
