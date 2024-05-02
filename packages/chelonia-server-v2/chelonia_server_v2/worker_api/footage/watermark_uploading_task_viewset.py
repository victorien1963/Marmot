from footage.models import WatermarkUploadingTask

from worker_api.utils.uploading_task import UploadingTaskViewSet, UploadingTaskSerializer


class WatermarkUploadingTaskSerializer(UploadingTaskSerializer):
    class Meta(UploadingTaskSerializer.Meta):
        model = WatermarkUploadingTask


class WatermarkUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = WatermarkUploadingTask.objects.filter(deleted=False)
    serializer_class = WatermarkUploadingTaskSerializer
