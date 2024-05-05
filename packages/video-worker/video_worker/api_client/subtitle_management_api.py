from .api_client_base import APIClientBase
from utils.logger import DefaultLogger
from typing import List


class SubtitleCreationInformation:
    def __init__(self, source_video_id: str, start: float, end: float, text: int):
        self.source_video_id = source_video_id
        self.start = start
        self.end = end
        self.text = text

    def to_request_body(self):
        return {
            "source_video": self.source_video_id,
            "start": self.start,
            "end": self.end,
            "text": self.text
        }


class SubtitleManagementAPI(APIClientBase):
    def create_list_of_subtitle(self, subtitle_creation_information_list: List[SubtitleCreationInformation]):
        DefaultLogger().info(f"Creat subtitle for: {subtitle_creation_information_list[0].source_video_id}")

        subtitle_list_request_body = [ subtitle_creation_information.to_request_body() for subtitle_creation_information in subtitle_creation_information_list ]

        self.post(subtitle_list_request_body)
