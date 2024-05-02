from core.models import ProcessingTask
from core.serializers import ProcessingTaskSerializer
from utilities.viewset import ModelListSerializerViewSet


class ProcessingTaskViewSet(ModelListSerializerViewSet):
    queryset = ProcessingTask.objects.all()
    serializer_class = ProcessingTaskSerializer
    filterset_fields = ['processing_status']
