from footage.models import TransitionAnimation
from common_api.utils.uploaded_object_management import UploadedObjectManagementSerializer
from common_api.utils.uploaded_object_management import UploadedObjectManagementViewSet


class TransitionAnimationManagementSerializer(UploadedObjectManagementSerializer):
    class Meta(UploadedObjectManagementSerializer.Meta):
        model = TransitionAnimation
        fields = ["transition_animation_id", "duration"] + UploadedObjectManagementSerializer.Meta.fields
        read_only_fields = ["transition_animation_id", "duration"] + UploadedObjectManagementSerializer.Meta.read_only_fields


class TransitionAnimationManagementViewSet(UploadedObjectManagementViewSet):
    queryset = TransitionAnimation.objects.filter(deleted=False)
    serializer_class = TransitionAnimationManagementSerializer
