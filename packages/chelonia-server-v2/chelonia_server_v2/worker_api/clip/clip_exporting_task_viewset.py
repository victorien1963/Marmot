from rest_framework import serializers
from rest_framework.mixins import ListModelMixin, UpdateModelMixin
from utilities.viewset import SoftDeleteModelMixin
from clip.models import ClipExportingTask, Clip
from video.models import Video
from artifact.models import Artifact
from rest_framework.exceptions import APIException
from rest_framework import status
from django.db.models import Prefetch
from task.models import CommonTaskStatus
from rest_framework.viewsets import GenericViewSet


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ["artifact_id", "path", "artifact_format", "artifact_size"]


class VideoSerializer(serializers.ModelSerializer):
    source_artifact = ArtifactSerializer(read_only=True)

    class Meta:
        model = Video
        fields = ["video_id", "source_artifact"]


class ClipSerializer(serializers.ModelSerializer):
    source_video = VideoSerializer(read_only=True)

    class Meta:
        model = Clip
        fields = ["clip_id", "source_video", "start", "end"]

class ClipExportingTaskSerializer(serializers.ModelSerializer):
    source_clip = ClipSerializer(read_only=True)
    allowed_status = [CommonTaskStatus.FAILED, CommonTaskStatus.FINISHED, CommonTaskStatus.PROCESSING]

    class Meta:
        model = ClipExportingTask
        fields = ["created_at", "source_clip", "exported_clip_expired_at", "path_to_export", "task_status", "task_id", "description"]
        read_only_fields = ["created_at", "source_clip", "exported_clip_expired_at", "path_to_export", "task_id"]

    def update(self, instance, validated_data):
        task_status = validated_data.pop("task_status")
        description = validated_data.pop("description", "")

        # Disallow backend to set tasks to created
        if task_status in self.allowed_status:
            instance.task_status = task_status
            instance.description = description

        instance.save()

        return instance

    @staticmethod
    def __raise_custom_validation_error(detail, code):
        exception = APIException(detail=detail, code=code)
        exception.status_code = status.HTTP_400_BAD_REQUEST
        raise exception


class ClipExportingTaskViewSet(GenericViewSet, ListModelMixin, UpdateModelMixin, SoftDeleteModelMixin):
    queryset = ClipExportingTask.objects.filter(deleted=False).prefetch_related(
        Prefetch("source_clip"),
        Prefetch("source_clip__source_video"),
        Prefetch("source_clip__source_video__source_artifact")
    )
    serializer_class = ClipExportingTaskSerializer
    filterset_fields = ["task_status"]
