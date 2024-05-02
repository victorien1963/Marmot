from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase
from task_base.dispatcher_initializer_base import DispatcherInitializerBase
import settings
from .object_creation_worker import ObjectCreationWorker
from .object_creation_worker_dispatcher import ObjectCreationWorkerDispatcher
from object_store.copy_file import CopyFile
from object_store.get_file_size import GetFileSize
from object_store.object_store_client_creator import ObjectStoreClientCreator
from api_client.uploading_task_api_client import UploadingTaskAPI
from api_client.uploaded_object_management_api import UploadedObjectManagementAPI


class ObjectCreationWorkerDispatcherInitializerBase(DispatcherInitializerBase):
    def __init__(self, object_type, object_management_api_url: str, object_uploading_api_url: str):
        self.__object_type = object_type
        self.__object_management_api_url = object_management_api_url
        self.__object_uploading_api_url = object_uploading_api_url

    def execute(self) -> TaskWorkerDispatcherBase:
        # dependencies
        object_store_client_creator = ObjectStoreClientCreator(
            object_store_type=settings.CUSTOM_OBJECT_STORE_TYPE, endpoint=settings.CUSTOM_OBJECT_STORE_ENDPOINT)
        copy_file_operation = CopyFile(
            bucket_name=settings.OBJECT_STORE_BUCKET, object_store_client_creator=object_store_client_creator)
        get_file_size_operation = GetFileSize(
            bucket_name=settings.OBJECT_STORE_BUCKET, object_store_client_creator=object_store_client_creator)
        uploaded_object_management_api = UploadedObjectManagementAPI(self.__object_management_api_url)
        uploading_task_api = UploadingTaskAPI(self.__object_uploading_api_url)

        # initializer worker
        object_creation_task_worker = ObjectCreationWorker(
            get_file_size_operation=get_file_size_operation, copy_file_operation=copy_file_operation,
            object_uploading_task_api=uploading_task_api, uploaded_object_management_api=uploaded_object_management_api,
            object_type=self.__object_type)

        # initializer worker dispatcher
        object_creation_worker_dispatcher = ObjectCreationWorkerDispatcher(
            uploading_task_api=uploading_task_api, object_creation_worker=object_creation_task_worker,
            task_dispatch_interval=settings.TASK_DISPATCH_INTERVAL, object_type=self.__object_type)

        return object_creation_worker_dispatcher
