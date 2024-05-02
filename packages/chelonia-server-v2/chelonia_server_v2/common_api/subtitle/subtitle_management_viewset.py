from rest_framework import serializers
from model_permission.proxy import Proxy
from subtitle.models import Subtitle
from model_permission.permission_viewset import PermissionViewSet
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
import logging


class SubtitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtitle
        fields = ["subtitle_id", "source_video", "start", "end", "text"]
        read_only_fields = ["subtitle_id"]

    def create(self, validated_data):
        current_user = self.context['request'].user
        logging.info(validated_data)
        source_video = validated_data.pop('source_video')
        start = validated_data.pop('start')
        end = validated_data.pop('end')
        text = validated_data.pop('text')

        subtitle = Proxy(user=current_user, source_model=Subtitle).create(
            source_video=source_video, start=start, end=end, text=text
        )

        return subtitle

    def update(self, instance, validated_data):
        # Disallow user to modify source video
        validated_data.pop('source_video')
        super().update(instance, validated_data)


class SubtitleManagementViewSet(PermissionViewSet, ListModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin):
    queryset = Subtitle.objects.filter()
    serializer_class = SubtitleSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_set = ["source_video"]
    ordering_fields = ["start"]
    ordering = ["start"]
