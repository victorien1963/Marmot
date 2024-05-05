from subtitle.models import SubtitleGenerationTask
from video.models import Video
from common_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from common_api.utils.uploaded_object_management import UploadedObjectManagementViewSet
from clip.models import Clip
import logging
from rest_framework import serializers
from django.conf import settings
from model_permission.proxy import Proxy
import pycountry
from rest_framework.exceptions import APIException
from rest_framework import status
from utilities.object_store import ObjectStore
from rest_framework.decorators import action
from http import HTTPMethod
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.core.exceptions import ObjectDoesNotExist


class VideoManagementSerializer(UploadedObjectManagementSerializer):
    class Meta(UploadedObjectManagementSerializer.Meta):
        model = Video
        fields = ["video_id", "taken_at", "location", "duration"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["video_id", "duration"] + UploadedObjectManagementSerializer.Meta.read_only_fields


class SubtitleGenerationTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtitleGenerationTask
        fields = ["source_video", "language", "prompt", "temperature", "task_status", "task_id"]
        read_only_fields = ["task_status", "task_id"]

    def create(self, validated_data):
        current_user = self.context['request'].user
        source_video = validated_data.pop('source_video')
        language = validated_data.pop('language', None)
        prompt = validated_data.pop('prompt', None)
        temperature = validated_data.pop('temperature', None)
        response_format = settings.OPENAI_RESPONSE_FORMAT
        timestamp_granularities = settings.OPENAI_TIMESTAMP_GURANULARITIES

        self.__check_source_video_exists(user=current_user, source_video=source_video)
        self.__check_task_already_exists(user=current_user, source_video=source_video)
        self.__check_language_valid(language)

        temp_audio_file_path = ObjectStore().generate_temp_file_path(username=current_user, filename=source_video.video_id, extension="mp3")

        subtitle_generation_task = Proxy(user=current_user, source_model=SubtitleGenerationTask).create(
            source_video=source_video, language=language, prompt=prompt, temperature=temperature, response_format=response_format,
            timestamp_granularities=timestamp_granularities, temp_audio_file_path=temp_audio_file_path
        )

        return subtitle_generation_task

    def __check_source_video_exists(self, user, source_video):
        if Proxy(user=user, source_model=Video).filter(deleted=False, video_id=source_video.video_id).exists() is False:
            self.__raise_custom_validation_error(detail="Source video doesn't exists", code="source_video_error")

    def __check_task_already_exists(self, user, source_video):
        if Proxy(user=user, source_model=SubtitleGenerationTask).filter(deleted=False, source_video=source_video).exists() is True:
            self.__raise_custom_validation_error(detail="Task for generating subtitle of this video already exists", code="subtitle_generation_task_already_exists_error")

    def __check_language_valid(self, language):
        if language is not None and pycountry.languages.get(alpha_2=language) is None:
            self.__raise_custom_validation_error(detail=f"Language code {language} is not valid", code="language_code_error")

    @staticmethod
    def __raise_custom_validation_error(detail, code):
        exception = APIException(detail=detail, code=code)
        exception.status_code = status.HTTP_400_BAD_REQUEST
        raise exception


class VideoManagementViewSet(UploadedObjectManagementViewSet):
    queryset = Video.objects.filter(deleted=False)
    serializer_class = VideoManagementSerializer

    def destroy(self, request, *args, **kwargs):
        self.soft_delete_related_clip(request)
        return super().destroy(request, *args, **kwargs)

    def soft_delete_related_clip(self, request):
        user = request.user
        instance = self.get_object()

        Proxy(user=user, source_model=Clip).filter(source_video=instance).soft_delete()
        logging.info(f"Delete clips related to {instance}")

    @action(detail=True, methods=[HTTPMethod.GET, HTTPMethod.POST], permission_classes=[permissions.IsAuthenticated], url_path="subtitle-generation-task")
    def subtitle_generation_task(self, request, pk):
        if request.method == HTTPMethod.POST:
            return self.__create_subtitle_generation_task(request)
        elif request.method == HTTPMethod.GET:
            return self.__get_subtitle_generation_task(request)

    def __create_subtitle_generation_task(self, request):
        source_video = self.get_object()
        data = {
            "source_video": source_video.video_id,
            "language": request.data.get("language", None),
            "prompt": request.data.get("prompt", None),
            "temperature": request.data.get("temperature", None),
        }
        serializer = SubtitleGenerationTaskSerializer(data=data, context=self.get_serializer_context())

        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def __get_subtitle_generation_task(self, request):
        user = request.user
        source_video = self.get_object()

        try:
            subtitle_generation_task = Proxy(user=user, source_model=SubtitleGenerationTask).get(source_video=source_video)
            return Response(SubtitleGenerationTaskSerializer(subtitle_generation_task).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)