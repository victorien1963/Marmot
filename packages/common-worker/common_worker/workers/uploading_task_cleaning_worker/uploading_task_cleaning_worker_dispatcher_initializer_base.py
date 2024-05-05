from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from task_base.dispatcher_initializer_base import DispatcherInitializerBase
import settings
from .uploading_task_cleaning_worker import UploadingTaskCleaningTaskWorker
from .uploading_task_cleaning_worker_dispatcher import UploadingTaskCleaningWorkerDispatcher
from object_store.delete_file import DeleteFile
from object_store.object_store_client_creator import ObjectStoreClientCreator
from api_client.uploading_task_api_client import UploadingTaskAPI


class UploadingTaskCleaningWorkerDispatcherInitializerBase(DispatcherInitializerBase):
    def __init__(self, object_type: str, uploading_task_api_url: str):
        self.__object_type = object_type
        self.__uploading_task_api_url = uploading_task_api_url

    def execute(self) -> TaskWorkerDispatcherBase:
        object_store_client_creator = ObjectStoreClientCreator(
            object_store_type=settings.CUSTOM_OBJECT_STORE_TYPE, endpoint=settings.CUSTOM_OBJECT_STORE_ENDPOINT)
        delete_file_operation = DeleteFile(
            bucket_name=settings.OBJECT_STORE_BUCKET, object_store_client_creator=object_store_client_creator)
        uploading_task_api = UploadingTaskAPI(self.__uploading_task_api_url)

        # initialize worker
        uploading_task_cleaning_worker = UploadingTaskCleaningTaskWorker(
            delete_file_operation=delete_file_operation, uploading_task_api=uploading_task_api, object_type=self.__object_type)

        # initializer worker dispatcher
        uploading_task_cleaning_worker_dispatcher = UploadingTaskCleaningWorkerDispatcher(
            uploading_task_api=uploading_task_api,
            uploading_task_cleaning_worker=uploading_task_cleaning_worker,
            task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL,
            object_type=self.__object_type)

        return uploading_task_cleaning_worker_dispatcher
