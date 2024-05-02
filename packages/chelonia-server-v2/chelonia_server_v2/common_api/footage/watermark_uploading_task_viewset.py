from footage.models import WatermarkUploadingTask

from common_api.utils.uploading_task import UploadingTaskViewSet, UploadingTaskSerializer
from utilities.object_store import ObjectDirectory


class WatermarkUploadingTaskSerializer(UploadingTaskSerializer):
    target_directory = ObjectDirectory.WATERMARK

    class Meta(UploadingTaskSerializer.Meta):
        model = WatermarkUploadingTask


class WatermarkUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = WatermarkUploadingTask.objects.filter(deleted=False)
    serializer_class = WatermarkUploadingTaskSerializer
