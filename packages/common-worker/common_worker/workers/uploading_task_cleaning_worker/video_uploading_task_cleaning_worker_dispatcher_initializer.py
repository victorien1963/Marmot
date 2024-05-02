from .uploading_task_cleaning_worker_dispatcher_initializer_base import UploadingTaskCleaningWorkerDispatcherInitializerBase
import settings


class VideoUploadingTaskCleaningWorkerDispatcherInitializer(UploadingTaskCleaningWorkerDispatcherInitializerBase):
    def __init__(self):
        super().__init__(object_type="video", uploading_task_api_url=settings.WORKER_VIDEO_UPLOADING_TASK_URL)
