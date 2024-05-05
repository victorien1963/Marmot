from footage.models import TransitionAnimationUploadingTask

from worker_api.utils.uploading_task import UploadingTaskViewSet, UploadingTaskSerializer


class TransitionAnimationUploadingTaskSerializer(UploadingTaskSerializer):
    class Meta(UploadingTaskSerializer.Meta):
        model = TransitionAnimationUploadingTask


class TransitionAnimationUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = TransitionAnimationUploadingTask.objects.filter(deleted=False)
    serializer_class = TransitionAnimationUploadingTaskSerializer
