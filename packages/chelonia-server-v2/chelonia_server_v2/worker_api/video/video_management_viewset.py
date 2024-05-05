from video.models import Video
from model_permission.models import ProtectedVideoUploadingTask
from worker_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from worker_api.utils.uploaded_object_management import UploadedObjectManagementViewSet


class VideoManagementSerializer(UploadedObjectManagementSerializer):
    protected_uploading_task_model = ProtectedVideoUploadingTask

    class Meta(UploadedObjectManagementSerializer.Meta):
        model = Video
        object_id_field = "video_id"
        fields = ["video_id", "taken_at", "location", "duration"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["video_id"]


class VideoManagementViewSet(UploadedObjectManagementViewSet):
    serializer_class = VideoManagementSerializer
    queryset = Video.objects.filter(deleted=False)
