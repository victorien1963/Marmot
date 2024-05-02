from subtitle.models import SubtitleGenerationTask
from video.models import Video
from rest_framework import serializers
from django.db.models import Prefetch
from rest_framework.mixins import ListModelMixin, UpdateModelMixin
from utilities.viewset import SoftDeleteModelMixin
from rest_framework.viewsets import GenericViewSet
from artifact.models import Artifact


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ["artifact_id", "path", "artifact_format", "artifact_size"]


class VideoSerializer(serializers.ModelSerializer):
    source_artifact = ArtifactSerializer(read_only=True)

    class Meta:
        model = Video
        fields = ["video_id", "source_artifact"]

class SubtitleGenerationTaskSerializer(serializers.ModelSerializer):
    source_video = VideoSerializer(read_only=True)

    class Meta:
        model = SubtitleGenerationTask
        fields = [
            "task_id", "task_status", "description",
            "source_video", "language", "prompt", "temperature", "timestamp_granularities", "response_format", "temp_audio_file_path"
        ]
        read_only_fields = [
            "task_id",
            "source_video", "language", "prompt", "temperature", "timestamp_granularities", "response_format", "temp_audio_file_path"
        ]


class SubtitleGenerationTaskViewSet(GenericViewSet, ListModelMixin, UpdateModelMixin, SoftDeleteModelMixin):
    queryset = SubtitleGenerationTask.objects.filter(deleted=False).prefetch_related(
        Prefetch("source_video"),
        Prefetch("source_video__source_artifact")
    )
    serializer_class = SubtitleGenerationTaskSerializer
    filterset_fields = ["task_status"]
