from subtitle.models import Subtitle
from rest_framework import serializers
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet
from model_permission.models import ProtectedVideo
from model_permission.proxy import Proxy


class SubtitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtitle
        fields = ["source_video", "start", "end", "text"]

    def create(self, validated_data):
        source_video = validated_data.pop("source_video")
        start = validated_data.pop("start")
        end = validated_data.pop("end")
        text = validated_data.pop("text")

        user = ProtectedVideo.objects.get(target=source_video).user
        subtitle = Proxy(user=user, source_model=Subtitle).create(
            start=start, end=end, text=text, source_video=source_video
        )

        return subtitle


class SubtitleManagementViewSet(GenericViewSet, CreateModelMixin, ListModelMixin):
    queryset = Subtitle.objects.all()
    serializer_class = SubtitleSerializer
    filterset_fields  = ["source_video"]

    def get_serializer(self, *args, **kwargs):
        """ if an array is passed, set serializer to many """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)
