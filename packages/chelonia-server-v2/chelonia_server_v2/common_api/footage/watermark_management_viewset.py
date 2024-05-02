from footage.models import Watermark
from common_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from common_api.utils.uploaded_object_management import UploadedObjectManagementViewSet


class WatermarkManagementSerializer(UploadedObjectManagementSerializer):
    class Meta(UploadedObjectManagementSerializer.Meta):
        model = Watermark
        fields = ["watermark_id"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["watermark_id"] + UploadedObjectManagementSerializer.Meta.read_only_fields


class WatermarkManagementViewSet(UploadedObjectManagementViewSet):
    queryset = Watermark.objects.filter(deleted=False)
    serializer_class = WatermarkManagementSerializer
