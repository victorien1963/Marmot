from rest_framework import serializers
from model_permission.permission_viewset import PermissionViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin
from rest_framework import permissions
from clip.models import Clip
from model_permission.proxy import Proxy
from video.models import Video
from rest_framework.exceptions import APIException
from rest_framework import status
from utilities.viewset import SoftDeleteModelMixin
from rest_framework.decorators import action
from http import HTTPMethod
from rest_framework.response import Response
from clip.models import ExportedClipMap
from django.core.exceptions import ObjectDoesNotExist
from utilities.object_store import ObjectStore
from clip.models import ClipExportingTask
from django.conf import settings


class ClipManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clip
        fields = [
            "clip_id", "source_video",
            "start", "end", "name", "description"
        ]
        read_only_fields = ["clip_id"]

    def create(self, validated_data):
        current_user = self.context['request'].user
        source_video = validated_data.pop("source_video")
        start = validated_data.pop("start")
        end = validated_data.pop("end")
        name = validated_data.pop("name", None)
        description = validated_data.pop("description", None)

        self.__validate_source_video(user=current_user, source_video=source_video)

        clip = Proxy(user=current_user, source_model=Clip).create(source_video=source_video, start=start, end=end, name=name, description=description)

        return clip

    def __validate_source_video(self, user, source_video):
        if Proxy(user=user, source_model=Video).filter(video_id=source_video.video_id).exists() is False:
            self.__raise_custom_validation_error(detail="Source video doesn't exists", code="source_video_error")

    @staticmethod
    def __raise_custom_validation_error(detail, code):
        exception = APIException(detail=detail, code=code)
        exception.status_code = status.HTTP_400_BAD_REQUEST
        raise exception

    def update(self, instance, validated_data):
        # Making source_video immutable after creation in case of client modify it under any circumstance
        validated_data.pop("source_video")
        return super().update(instance, validated_data)


class ExportedClipSerializer(serializers.ModelSerializer):
    view_url = serializers.SerializerMethodField()
    view_url_expiration_at = serializers.SerializerMethodField()

    class Meta:
        model = ExportedClipMap
        fields = ["view_url", "view_url_expiration_at"]
        read_only_fields = ["view_url", "view_url_expiration_at"]

    def get_view_url(self, obj):
        source_artifact_path = obj.exported_artifact.path
        return ObjectStore().generate_view_info(source_artifact_path)

    def get_view_url_expiration_at(self, obj):
        return obj.exported_artifact.expires_at


class ClipExportingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClipExportingTask
        fields = ["source_clip", "task_status", "task_id", "description"]
        read_only_fields = ["task_status", "task_id", "description"]

    def create(self, validated_data):
        current_user = self.context['request'].user
        source_clip = validated_data.pop("source_clip")

        self.__check_source_clip_exists(user=current_user, source_clip=source_clip)
        self.__check_task_already_exists(user=current_user, source_clip=source_clip)
        exported_clip_path = ObjectStore().generate_export_info(username=current_user.username, filename=source_clip.clip_id, extension=settings.EXPORT_FILE_TYPE)

        clip_exporting_task = Proxy(user=current_user, source_model=ClipExportingTask).create(source_clip=source_clip, exported_clip_expired_at=settings.VIEW_EXPIRE, path_to_export=exported_clip_path)

        return clip_exporting_task

    def __check_source_clip_exists(self, user, source_clip):
        if Proxy(user=user, source_model=Clip).filter(deleted=False, clip_id=source_clip.clip_id).exists() is False:
            self.__raise_custom_validation_error(detail="Source clip doesn't exists", code="source_clip_error")

    def __check_task_already_exists(self, user, source_clip):
        if Proxy(user=user, source_model=ClipExportingTask).filter(deleted=False, source_clip=source_clip).exists() is True:
            self.__raise_custom_validation_error(detail="Task for exporting this clip already exists", code="clip_exporting_task_already_exists_error")

    @staticmethod
    def __raise_custom_validation_error(detail, code):
        exception = APIException(detail=detail, code=code)
        exception.status_code = status.HTTP_400_BAD_REQUEST
        raise exception


class ClipManagementViewSet(PermissionViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, SoftDeleteModelMixin):
    queryset = Clip.objects.filter(deleted=False)
    serializer_class = ClipManagementSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields  = ["source_video"]

    @action(detail=True, methods=[HTTPMethod.GET], permission_classes=[permissions.IsAuthenticated], url_path="exported-clip")
    def get_exported_clip(self, request, pk):
        user = request.user
        clip = self.get_object()
        try:
            exported_clip_map = Proxy(user=user, source_model=ExportedClipMap).get(source_clip=clip)
            return Response(ExportedClipSerializer(exported_clip_map).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=[HTTPMethod.GET, HTTPMethod.POST], permission_classes=[permissions.IsAuthenticated], url_path="clip-exporting-task")
    def clip_exporting_task(self, request, pk):
        if request.method == HTTPMethod.POST:
            return self.create_clip_exporting_task(request)
        elif request.method == HTTPMethod.GET:
            return self.get_clip_exporting_task(request)

    def create_clip_exporting_task(self, request):
        clip = self.get_object()

        serializer = ClipExportingTaskSerializer(data={"source_clip": clip.clip_id}, context=self.get_serializer_context())

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_clip_exporting_task(self, request):
        user = request.user
        clip = self.get_object()
        try:
            clip_exporting_task = Proxy(user=user, source_model=ClipExportingTask).get(source_clip=clip)
            return Response(ClipExportingTaskSerializer(clip_exporting_task).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
