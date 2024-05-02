from utils.logger import DefaultLoggerConfigurator
from task_watcher import TaskWatcher
from workers.object_creation_worker.video_creation_worker_dispatcher_initializer import VideoCreationWorkerDispatcherInitializer
from workers.uploading_task_cleaning_worker.video_uploading_task_cleaning_worker_dispatcher_initializer import VideoUploadingTaskCleaningWorkerDispatcherInitializer
from workers.object_creation_worker.transition_animation_creation_worker_dispatcher_initializer import TransitionAnimationCreationWorkerDispatcherInitializer
from workers.uploading_task_cleaning_worker.transition_animation_uploading_task_cleaning_worker_dispatcher_initializer import TransitionAnimationUploadingTaskCleaningWorkerDispatcherInitializer
from workers.object_creation_worker.watermark_creation_worker_dispatcher_initiallizer import WatermarkCreationWorkerDispatcherInitializer
from workers.uploading_task_cleaning_worker.watermark_uploading_task_cleaning_worker_dispatcher_initializer import WatermarkUploadingTaskCleaningWorkerDispatcherInitializer
import settings



if __name__ == '__main__':
    DefaultLoggerConfigurator().execute()

    # Video uploading related workers
    video_creation_worker_dispatcher = VideoCreationWorkerDispatcherInitializer().execute()
    video_uploading_task_cleaning_worker_dispatcher = VideoUploadingTaskCleaningWorkerDispatcherInitializer().execute()
    # Transition animation uploading related workers
    transition_animation_creation_worker_dispatcher = TransitionAnimationCreationWorkerDispatcherInitializer().execute()
    transition_animation_uploading_task_cleaning_worker_dispatcher = TransitionAnimationUploadingTaskCleaningWorkerDispatcherInitializer().execute()
    # Watermark uploading related workers
    watermark_creation_worker_dispatcher = WatermarkCreationWorkerDispatcherInitializer().execute()
    watermark_uploading_task_cleaning_worker_dispatcher = WatermarkUploadingTaskCleaningWorkerDispatcherInitializer().execute()

    task_watcher = TaskWatcher(
        task_dispatcher_list=[
            video_creation_worker_dispatcher,
            video_uploading_task_cleaning_worker_dispatcher,
            transition_animation_creation_worker_dispatcher, transition_animation_uploading_task_cleaning_worker_dispatcher,
            watermark_creation_worker_dispatcher, watermark_uploading_task_cleaning_worker_dispatcher
        ],
        task_scan_interval=settings.TASK_SCAN_INTERVAL,
        task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL).execute()
