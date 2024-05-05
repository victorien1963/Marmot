from api_client.subtitle_generation_task_api import SubtitleGenerationTaskAPI, SubtitleGenerationTask
from api_client.subtitle_management_api import SubtitleManagementAPI, SubtitleCreationInformation
from utils.logger import DefaultLogger
from moviepy.editor import VideoFileClip
from pathlib import Path
from openai import OpenAI


class SubtitleGenerationWorker:
    def __init__(
        self, object_store_bucket_mount_root: str,
        subtitle_management_api: SubtitleManagementAPI, subtitle_generation_task_api: SubtitleGenerationTaskAPI,
        openai_key: str
    ):
        self.__object_store_bucket_mount_root = object_store_bucket_mount_root

        self.__subtitle_management_api = subtitle_management_api
        self.__subtitle_generation_task_api = subtitle_generation_task_api

        self.__openai_key = openai_key
        # self.__openai_client = OpenAI(api_key=openai_key)

    def execute(self, subtitle_generation_task: SubtitleGenerationTask):
        try:
            DefaultLogger().info(f"Start generating subtitle for the video {subtitle_generation_task.source_video_id}")

            video_file_path = Path(self.__object_store_bucket_mount_root, subtitle_generation_task.source_artifact_path)
            temp_audio_file_path = Path(self.__object_store_bucket_mount_root, subtitle_generation_task.temp_audio_file_path)

            self.__ensure_audio_directory_exist(temp_audio_file_path)
            self.__extract_audio(video_file_path=video_file_path, temp_audio_file_path=temp_audio_file_path)
            transcript = self.__generate_subtitle(subtitle_generation_task=subtitle_generation_task, temp_audio_file_path=temp_audio_file_path)
            self.__record_subtitles(subtitle_generation_task=subtitle_generation_task, transcript=transcript)
            self.__remove_temp_audio_file(temp_audio_file_path)
            self.__subtitle_generation_task_api.set_task_finished(subtitle_generation_task.task_id)
        except Exception as e:
            self.__subtitle_generation_task_api.set_task_failed(task_id=subtitle_generation_task.task_id, details=str(e))
            DefaultLogger().error(f"Failed to generate subtitle: {e}")

    @staticmethod
    def __ensure_audio_directory_exist(temp_audio_file_path: Path):
        DefaultLogger().info(f"Ensure audio directory {temp_audio_file_path.parent} exists.")
        temp_audio_file_path.parent.mkdir(exist_ok=True)

    def __extract_audio(self, video_file_path: Path, temp_audio_file_path: Path):
        DefaultLogger().info(f"Extracting audio from video {video_file_path.as_posix()}. Save to {temp_audio_file_path.as_posix()}")
        video_clip = VideoFileClip(video_file_path.as_posix())
        audio_clip = video_clip.audio
        audio_clip.write_audiofile(temp_audio_file_path.as_posix(), fps=8000, bitrate="320k")

        DefaultLogger().info(f"Close files")
        video_clip.close()
        audio_clip.close()

    def __generate_subtitle(self, subtitle_generation_task: SubtitleGenerationTask, temp_audio_file_path: Path):
        DefaultLogger().info("Call OpenAI to generate transcript.")
        client = OpenAI(api_key=self.__openai_key)
        transcript = client.audio.transcriptions.create(
            model='whisper-1', file=temp_audio_file_path,
            language=subtitle_generation_task.language,
            prompt=subtitle_generation_task.prompt,
            temperature=subtitle_generation_task.temperature,
            response_format=subtitle_generation_task.response_format,
            timestamp_granularities=subtitle_generation_task.timestamp_granularities)
        DefaultLogger().debug(f"Finished Generation. Full transcript object: {transcript}")

        return transcript

    def __record_subtitles(self, subtitle_generation_task: SubtitleGenerationTask, transcript):
        DefaultLogger().info("Record all subtitles")
        subtitle_creation_information_list = list()

        for segment in transcript.segments:
            if segment["text"] != "":
                subtitle_creation_information_list.append(SubtitleCreationInformation(
                    source_video_id=subtitle_generation_task.source_video_id,
                    start=segment["start"], end=segment["end"], text=segment["text"])
                )
        DefaultLogger().info("Parsed all subtitles")
        self.__subtitle_management_api.create_list_of_subtitle(subtitle_creation_information_list)

    def __remove_temp_audio_file(self, temp_audio_file_path: Path):
        DefaultLogger().info(f"Delete temp audio file {temp_audio_file_path.as_posix()}")
        temp_audio_file_path.unlink()
