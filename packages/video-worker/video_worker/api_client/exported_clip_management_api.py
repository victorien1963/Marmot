from .api_client_base import APIClientBase
from utils.logger import DefaultLogger


class ExportedClipCreationInformation:
    def __init__(self, source_clip_id: str, exported_artifact_path: str, exported_artifact_format: str, exported_artifact_size: int, exported_artifact_expire_at: str):
        self.source_clip_id = source_clip_id
        self.exported_artifact_path = exported_artifact_path
        self.exported_artifact_format = exported_artifact_format
        self.exported_artifact_size = exported_artifact_size
        self.exported_artifact_expire_at = exported_artifact_expire_at

    def to_request_body(self):
        return {
            "source_clip": self.source_clip_id,
            "exported_artifact": {
                "path": self.exported_artifact_path,
                "artifact_format": self.exported_artifact_format,
                "artifact_size": self.exported_artifact_size,
                "expires_at": self.exported_artifact_expire_at
            }
        }


class ExportedClipManagementAPI(APIClientBase):
    def create_target_object(self, exported_clip: ExportedClipCreationInformation):
        DefaultLogger().info(f"Creat exported clip for: {exported_clip.source_clip_id}")
        self.post(exported_clip.to_request_body())
