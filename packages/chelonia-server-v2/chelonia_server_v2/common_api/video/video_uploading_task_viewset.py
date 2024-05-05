from utilities.object_store import ObjectDirectory
from video.models import VideoUploadingTask
from common_api.utils.uploading_task import UploadingTaskViewSet
from common_api.utils.uploading_task import UploadingTaskSerializer


class VideoUploadingTaskSerializer(UploadingTaskSerializer):
    target_directory = ObjectDirectory.VIDEO

    class Meta(UploadingTaskSerializer.Meta):
        model = VideoUploadingTask


class VideoUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = VideoUploadingTask.objects.filter(deleted=False)
    serializer_class = VideoUploadingTaskSerializer
