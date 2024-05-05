from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from task_base.dispatcher_initializer_base import DispatcherInitializerBase
import settings

from api_client.subtitle_management_api import SubtitleManagementAPI
from api_client.subtitle_generation_task_api import SubtitleGenerationTaskAPI
from .subtitle_generation_worker import SubtitleGenerationWorker
from .subtitle_generation_worker_dispatcher import SubtitleGenerationWorkerDispatcher

class SubtitleGenerationWorkerDispatcherInitializer(DispatcherInitializerBase):
    def execute(self) -> TaskWorkerDispatcherBase:
        # dependencies
        subtitle_management_api = SubtitleManagementAPI(settings.WORKER_SUBTITLE_MANAGEMENT_URL)
        subtitle_generation_task_api = SubtitleGenerationTaskAPI(settings.WORKER_SUBTITLE_GENERATION_TASK_URL)

        # initialize worker
        subtitle_generation_worker = SubtitleGenerationWorker(
            object_store_bucket_mount_root=settings.OBJECT_STORE_BUCKET_MOUNT_ROOT,
            subtitle_management_api=subtitle_management_api,
            subtitle_generation_task_api=subtitle_generation_task_api,
            openai_key=settings.OPENAI_KEY
        )

        # initialize dispatcher
        subtitle_generation_worker_dispatcher = SubtitleGenerationWorkerDispatcher(
            subtitle_generation_task_api=subtitle_generation_task_api,
            subtitle_generation_worker=subtitle_generation_worker,
            task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL)

        return subtitle_generation_worker_dispatcher
