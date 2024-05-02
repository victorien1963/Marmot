from .uploading_task_cleaning_worker_dispatcher_initializer_base import UploadingTaskCleaningWorkerDispatcherInitializerBase
import settings


class WatermarkUploadingTaskCleaningWorkerDispatcherInitializer(UploadingTaskCleaningWorkerDispatcherInitializerBase):
    def __init__(self):
        super().__init__(object_type="watermark", uploading_task_api_url=settings.WORKER_WATERMARK_UPLOADING_TASK_URL)
