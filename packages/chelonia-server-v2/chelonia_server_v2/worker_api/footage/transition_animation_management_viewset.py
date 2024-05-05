from footage.models import TransitionAnimation
from model_permission.models import ProtectedTransitionAnimationUploadingTask
from worker_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from worker_api.utils.uploaded_object_management import UploadedObjectManagementViewSet


class TransitionAnimationManagementSerializer(UploadedObjectManagementSerializer):
    protected_uploading_task_model = ProtectedTransitionAnimationUploadingTask

    class Meta(UploadedObjectManagementSerializer.Meta):
        model = TransitionAnimation
        object_id_field = "transition_animation_id"
        fields = ["transition_animation_id", "duration"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["transition_animation_id"]


class TransitionAnimationManagementViewSet(UploadedObjectManagementViewSet):
    serializer_class = TransitionAnimationManagementSerializer
    queryset = TransitionAnimation.objects.filter(deleted=False)
