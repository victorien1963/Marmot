from .api_client_base import APIClientBase
from utils.logger import DefaultLogger


class UploadedObjectCreationInformation:
    def __init__(self, task_id: str, name: str, path: str, artifact_format: str, artifact_size: int):
        self.task_id = task_id
        self.name = name
        self.path = path
        self.artifact_format = artifact_format
        self.artifact_size = artifact_size

    def to_request_body(self):
        return {
            "task_id": self.task_id,
            "name": self.name,
            "source_artifact": {
                "path": self.path,
                "artifact_format": self.artifact_format,
                "artifact_size": self.artifact_size
            }
        }


class UploadedObjectManagementAPI(APIClientBase):
    def create_target_object(self, uploaded_object: UploadedObjectCreationInformation):
        DefaultLogger().info(f"Creat target object: {uploaded_object.task_id}")
        self.post(uploaded_object.to_request_body())
