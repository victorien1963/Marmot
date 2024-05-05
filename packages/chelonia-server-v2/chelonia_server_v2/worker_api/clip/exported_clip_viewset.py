from rest_framework import serializers
from rest_framework.mixins import CreateModelMixin, ListModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from clip.models import ExportedClipMap
from django.db.models import Prefetch
from artifact.models import ExportedArtifact
from model_permission.models import ProtectedClip
from model_permission.proxy import Proxy
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from http import HTTPMethod
from datetime import datetime


class ExportedArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExportedArtifact
        fields = ["path", "artifact_format", "artifact_size", "expires_at"]


class ExportedClipSerializer(serializers.ModelSerializer):
    exported_artifact = ExportedArtifactSerializer(many=False)

    class Meta:
        model = ExportedClipMap
        fields = ["exported_clip_map_id", "source_clip", "exported_artifact"]
        read_only_fields = ["exported_clip_map_id"]

    def create(self, validated_data):
        source_clip = validated_data.pop("source_clip")
        exported_artifact_info = validated_data.pop("exported_artifact")

        user = ProtectedClip.objects.get(target=source_clip).user
        exported_artifact = Proxy(user=user, source_model=ExportedArtifact).create(**exported_artifact_info)
        exported_clip_map = Proxy(user=user, source_model=ExportedClipMap).create(source_clip=source_clip, exported_artifact=exported_artifact)

        return exported_clip_map


class ExportedClipViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, DestroyModelMixin):
    queryset = ExportedClipMap.objects.filter().prefetch_related(
        Prefetch("source_clip"), Prefetch("exported_artifact")
    )
    serializer_class = ExportedClipSerializer
    filterset_fields  = ["source_clip"]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        ExportedClipMap.objects.get(source_clip=instance.source_clip).delete()
        ExportedArtifact.objects.get(artifact_id=instance.exported_artifact.artifact_id).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=[HTTPMethod.GET], url_path="expired")
    def expired(self, request, *args, **kwargs):
        expired_exported_clip = ExportedClipMap.objects.filter(
            exported_artifact__expires_at__lt=datetime.now()
        )

        page = self.paginate_queryset(expired_exported_clip)
        if page is not None:
            serializer = ExportedClipSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ExportedClipSerializer(expired_exported_clip, many=True)
        return Response(serializer.data)
