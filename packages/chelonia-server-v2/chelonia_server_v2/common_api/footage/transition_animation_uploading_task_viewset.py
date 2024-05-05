from footage.models import TransitionAnimationUploadingTask
from common_api.utils.uploading_task import UploadingTaskViewSet, UploadingTaskSerializer
from utilities.object_store import ObjectDirectory


class TransitionAnimationUploadingTaskSerializer(UploadingTaskSerializer):
    target_directory = ObjectDirectory.TRANSITION_ANIMATION
    class Meta(UploadingTaskSerializer.Meta):
        model = TransitionAnimationUploadingTask


class TransitionAnimationUploadingTaskViewSet(UploadingTaskViewSet):
    queryset = TransitionAnimationUploadingTask.objects.filter(deleted=False)
    serializer_class = TransitionAnimationUploadingTaskSerializer
