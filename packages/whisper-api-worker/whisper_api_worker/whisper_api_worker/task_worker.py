from whisper_api_server_client import WhisperAPIServerClient
import settings
from .utils import RawFragmentCollector, RawFragmentMerger, Transcriber
from pathlib import Path
from logger import DefaultLogger
import traceback


class VideoFileNotExist(Exception):
    def __init__(self, expected_video_file_path):
        super().__init__(f"The path {expected_video_file_path} does not exist")


class TaskWorker:
    def __init__(self, whisper_api_server_client: WhisperAPIServerClient, processing_task):
        self.__whisper_api_server_client = whisper_api_server_client

        self.__task_id = processing_task["id"]
        self.__bucket_name = processing_task["bucket_name"]
        self.__path = processing_task["path"]

        self.__language_detection = processing_task["language_detection"] if \
            processing_task["language_detection"] is not "auto" else \
            processing_task["language_detection"]
        self.__word_level_timestamps = processing_task["word_level_timestamps"]
        self.__merge_sentences = processing_task["merge_sentences"]
        self.__max_gap_between_sentences = processing_task["max_gap_between_sentences_ms"] / 1000.0 # unit should be sec
        self.__vad_filter = processing_task["vad_filter"]
        self.__vad_filter_silence_duration = processing_task["vad_filter_silence_duration_ms"]

        self.__video_file_path = Path(settings.BUCKET_MOUNT_ROOT) / Path(self.__path)

    def execute(self):
        task_success = False
        failure = str()

        try:
            self.__run_core_task()
            task_success = True

        except VideoFileNotExist as e:
            failure = f"The path {self.__video_file_path} does not exist"
            DefaultLogger().error(failure)
            DefaultLogger().error(traceback.format_exc())

        except Exception as e:
            failure = f"Error occur while processing {e}"
            DefaultLogger().error(failure)
            DefaultLogger().error(traceback.format_exc())

        finally:
            self.__update_task_status(task_success=task_success, failure=failure)

    def __run_core_task(self):
        self.__validate_video_file_path()
        DefaultLogger().info(f"Transcribe target video file")
        segments, information = Transcriber(
            video_file_path=self.__video_file_path, language_detection=self.__language_detection,
            word_level_timestamps=self.__word_level_timestamps,
            vad_filter=self.__vad_filter, vad_filter_silence_duration=self.__vad_filter_silence_duration
        ).execute()

        DefaultLogger().info(f"Collect Fragments")
        raw_fragments = RawFragmentCollector(
            segments=segments, video_file_path=self.__video_file_path, word_level_timestamps=self.__word_level_timestamps
        ).execute()

        DefaultLogger().info(f"Merge Fragments")
        delimiter = ' ' if information.language in ['en', 'de', 'fr'] else ''
        merged_raw_fragments = RawFragmentMerger(
            raw_fragments=raw_fragments, delimiter=delimiter,
            merge=self.__merge_sentences, max_gap_between_sentences=self.__max_gap_between_sentences
        ).execute()
        self.__upload_fragments(merged_raw_fragments)

    def __validate_video_file_path(self):
        DefaultLogger().info(f"Check video file {self.__video_file_path} exists")
        if self.__video_file_path.exists() is False:
            raise VideoFileNotExist(self.__video_file_path)
        DefaultLogger().info(f"Video file {self.__video_file_path} exists")

    def __upload_fragments(self, fragments):
        DefaultLogger().info(f"Upload fragments {fragments}")
        for fragment in fragments:
            self.__whisper_api_server_client.subtitle.add_subtitle_to_task(
                task_id=self.__task_id, start=fragment["start"], end=fragment["end"], text=fragment["text"]
            )

    def __update_task_status(self, task_success, failure):
        if task_success:
            DefaultLogger().info(f"Mark the task {self.__task_id} finished")
            self.__whisper_api_server_client.processing_task.set_task_finished(self.__task_id)
        else:
            DefaultLogger().info(f"Mark the task {self.__task_id} failed")
            self.__whisper_api_server_client.processing_task.set_task_failed(self.__task_id, details=failure)
