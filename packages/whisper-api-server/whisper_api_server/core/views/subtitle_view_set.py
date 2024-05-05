import django_filters

from core.models import Subtitle
from core.serializers import SubtitleSerializer
from utilities.viewset import ModelListSerializerViewSet


class SubtitleFilter(django_filters.FilterSet):
    processing_task__bucket_name = django_filters.CharFilter(lookup_expr='exact')
    processing_task__path = django_filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Subtitle
        fields = ['processing_task']

class SubtitleViewSet(ModelListSerializerViewSet):
    queryset = Subtitle.objects.all()
    serializer_class = SubtitleSerializer
    filterset_class = SubtitleFilter