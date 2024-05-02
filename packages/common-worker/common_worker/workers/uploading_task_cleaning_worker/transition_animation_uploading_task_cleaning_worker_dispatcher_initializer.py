from .uploading_task_cleaning_worker_dispatcher_initializer_base import UploadingTaskCleaningWorkerDispatcherInitializerBase
import settings


class TransitionAnimationUploadingTaskCleaningWorkerDispatcherInitializer(UploadingTaskCleaningWorkerDispatcherInitializerBase):
    def __init__(self):
        super().__init__(object_type="transition animation", uploading_task_api_url=settings.WORKER_TRANSITION_ANIMATION_UPLOADING_TASK_URL)
