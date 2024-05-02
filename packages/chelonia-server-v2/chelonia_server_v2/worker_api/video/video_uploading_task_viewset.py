from video.models import VideoUploadingTask
from worker_api.utils.uploading_task import UploadingTaskViewSet, UploadingTaskSerializer



class VideoUploadingTaskSerializer(UploadingTaskSerializer):
    class Meta(UploadingTaskSerializer.Meta):
        model = VideoUploadingTask


class VideoUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = VideoUploadingTask.objects.filter(deleted=False)
    serializer_class = VideoUploadingTaskSerializer

