from common_api.utils.uploading_task import UploadingTaskSerializer as CommonSerializer
from task.models import UploadingTaskStatus


class UploadingTaskSerializer(CommonSerializer):
    allowed_status = [UploadingTaskStatus.MOVING, UploadingTaskStatus.FINISHED, UploadingTaskStatus.FAILED]
    class Meta(CommonSerializer.Meta):
        fields = [
            "task_id", "upload_link", "upload_path", "store_path",
            "task_status", "description", 'filename', 'extension', "created_at"
        ]
        read_only_fields = ["task_id", "upload_link", "created_at"]
