from .object_creation_worker_dispatcher_initializer_base import ObjectCreationWorkerDispatcherInitializerBase
import settings


class VideoCreationWorkerDispatcherInitializer(ObjectCreationWorkerDispatcherInitializerBase):
    def __init__(self):
        super().__init__(
            object_management_api_url=settings.WORKER_VIDEO_MANAGEMENT_URL,
            object_uploading_api_url=settings.WORKER_VIDEO_UPLOADING_TASK_URL,
            object_type="video"
        )
