from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from task_base.dispatcher_initializer_base import DispatcherInitializerBase
import settings

from api_client.exported_clip_management_api import ExportedClipManagementAPI
from api_client.clip_exporting_task_api import ClipExportingTaskAPI
from .clip_exporting_worker import ClipExportingWorker
from .clip_exporting_worker_dispatcher import ClipExportingWorkerDispatcher

class ClipExportingWorkerDispatcherInitializer(DispatcherInitializerBase):
    def execute(self) -> TaskWorkerDispatcherBase:
        # dependencies
        exported_clip_management_api = ExportedClipManagementAPI(settings.WORKER_EXPORTED_CLIP_MANAGEMENT_URL)
        clip_exporting_task_api = ClipExportingTaskAPI(settings.WORKER_CLIP_EXPORTING_TASK_URL)

        # initialize worker
        clip_exporting_worker = ClipExportingWorker(
            object_store_bucket_mount_root=settings.OBJECT_STORE_BUCKET_MOUNT_ROOT,
            exported_clip_management_api=exported_clip_management_api,
            clip_exporting_task_api=clip_exporting_task_api)

        # initialize dispatcher
        clip_exporting_worker_dispatcher = ClipExportingWorkerDispatcher(
            clip_exporting_task_api=clip_exporting_task_api,
            clip_exporting_worker=clip_exporting_worker,
            task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL)

        return clip_exporting_worker_dispatcher
