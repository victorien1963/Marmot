from api_client.clip_exporting_task_api import ClipExportingTaskAPI, ClipExportingTask
from api_client.exported_clip_management_api import ExportedClipManagementAPI, ExportedClipCreationInformation
from utils.logger import DefaultLogger
from moviepy.editor import VideoFileClip
from pathlib import Path
from datetime import datetime, timedelta


class ClipExportingWorker:
    def __init__(
        self, object_store_bucket_mount_root: str,
            exported_clip_management_api: ExportedClipManagementAPI, clip_exporting_task_api: ClipExportingTaskAPI,
    ):
        self.__object_store_bucket_mount_root = object_store_bucket_mount_root

        self.__exported_clip_management_api = exported_clip_management_api
        self.__clip_exporting_task_api = clip_exporting_task_api

    def execute(self, clip_exporting_task: ClipExportingTask):
        try:
            DefaultLogger().info(f"Start exporting task {clip_exporting_task.task_id} for the clip {clip_exporting_task.source_clip_id}")

            video_file_path = Path(self.__object_store_bucket_mount_root, clip_exporting_task.source_artifact_path)
            exported_clip_path = Path(self.__object_store_bucket_mount_root, clip_exporting_task.path_to_export)

            self.__ensure_exported_clip_directory_exist(exported_clip_path)
            self.__export_clip(
                clip_exporting_task=clip_exporting_task, video_file_path=video_file_path, exported_clip_path=exported_clip_path
            )
            self.__report_exported_clip_information(clip_exporting_task=clip_exporting_task, exported_clip_path=exported_clip_path)
            self.__clip_exporting_task_api.set_task_finished(clip_exporting_task.task_id)

        except Exception as e:
            self.__clip_exporting_task_api.set_task_failed(task_id=clip_exporting_task.task_id, details=str(e))
            DefaultLogger().error(f"Failed to export clp: {e}")

    @staticmethod
    def __ensure_exported_clip_directory_exist(exported_clip_path: Path):
        DefaultLogger().info(f"Ensure exporting directory {exported_clip_path.parent} exists.")
        exported_clip_path.parent.mkdir(exist_ok=True)

    @staticmethod
    def __export_clip(clip_exporting_task: ClipExportingTask, video_file_path: Path, exported_clip_path: Path):
        DefaultLogger().info(
            f"Video file path: {video_file_path}. Exported clip path: {exported_clip_path}. Start {clip_exporting_task.start}. End {clip_exporting_task.end}")

        clip = VideoFileClip(video_file_path.as_posix()).subclip(clip_exporting_task.start, clip_exporting_task.end)
        clip.write_videofile(exported_clip_path.as_posix())

        DefaultLogger().info(f"Successfully export clip to {exported_clip_path}")

    def __report_exported_clip_information(self, clip_exporting_task: ClipExportingTask, exported_clip_path: Path):
        DefaultLogger().info(f"Reported exported clip information.")

        expire_time = datetime.now() + timedelta(seconds=clip_exporting_task.exported_clip_expired_at)

        self.__exported_clip_management_api.create_target_object(
            ExportedClipCreationInformation(
                source_clip_id=clip_exporting_task.source_clip_id,
                exported_artifact_expire_at=expire_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
                exported_artifact_format=clip_exporting_task.source_artifact_format,
                exported_artifact_path=clip_exporting_task.path_to_export,
                exported_artifact_size=exported_clip_path.lstat().st_size
            )
        )
