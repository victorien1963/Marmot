from faster_whisper import WhisperModel
import settings
from logger import DefaultLogger
from pathlib import Path


class Transcriber:
    def __init__(
        self, video_file_path: Path,
        language_detection: str, word_level_timestamps: bool,
        vad_filter: bool, vad_filter_silence_duration: int
    ):
        self.__compute_type = "int8"

        self.__video_file_path = video_file_path

        self.__language_detection = language_detection
        self.__word_level_timestamps = word_level_timestamps
        self.__vad_filter = vad_filter
        self.__vad_filter_silence_duration = vad_filter_silence_duration

    def execute(self):
        DefaultLogger().info(f"Load model from {settings.WHISPER_MODEL_PATH}")

        model = WhisperModel(
            model_size_or_path=settings.WHISPER_MODEL_PATH, device=settings.DEVICE_TYPE, compute_type=self.__compute_type
        )

        DefaultLogger().info(f"Model {settings.WHISPER_MODEL_PATH} loaded")

        segments, information = model.transcribe(
            audio=str(self.__video_file_path),
            language=self.__language_detection,
            beam_size=5,
            initial_prompt=settings.INITIAL_PROMPT,
            word_timestamps=self.__word_level_timestamps,
            vad_filter=self.__vad_filter,
            vad_parameters={
                "min_silence_duration_ms": self.__vad_filter_silence_duration
            }
        )

        DefaultLogger().info(f"Detect language {information.language} for video file: {self.__video_file_path}")

        return segments, information
