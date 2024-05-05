from utils.logger import DefaultLoggerConfigurator
from task_watcher import TaskWatcher
from workers.clip_exporting_worker.clip_exporting_worker_dispatcher_initializer import ClipExportingWorkerDispatcherInitializer
from workers.subtitle_generation_worker.subtitle_generation_worker_dispatcher_initializer import SubtitleGenerationWorkerDispatcherInitializer
import settings



if __name__ == '__main__':
    DefaultLoggerConfigurator().execute()

    clip_exporting_worker_dispatcher = ClipExportingWorkerDispatcherInitializer().execute()
    subtitle_generation_worker_dispatcher = SubtitleGenerationWorkerDispatcherInitializer().execute()

    task_watcher = TaskWatcher(
        task_dispatcher_list=[
            # clip_exporting_worker_dispatcher,
            subtitle_generation_worker_dispatcher
        ],
        task_scan_interval=settings.TASK_SCAN_INTERVAL,
        task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL).execute()
