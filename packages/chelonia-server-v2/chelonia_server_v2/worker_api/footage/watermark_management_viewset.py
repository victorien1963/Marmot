from footage.models import Watermark
from model_permission.models import ProtectedWatermarkUploadingTask
from worker_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from worker_api.utils.uploaded_object_management import UploadedObjectManagementViewSet


class WatermarkManagementSerializer(UploadedObjectManagementSerializer):
    protected_uploading_task_model = ProtectedWatermarkUploadingTask

    class Meta(UploadedObjectManagementSerializer.Meta):
        model = Watermark
        object_id_field = "watermark_id"
        fields = ["watermark_id"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["watermark_id"]


class WatermarkManagementViewSet(UploadedObjectManagementViewSet):
    serializer_class = WatermarkManagementSerializer
    queryset = Watermark.objects.filter(deleted=False)
