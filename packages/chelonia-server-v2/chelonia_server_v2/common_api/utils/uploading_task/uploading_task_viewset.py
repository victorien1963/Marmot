from model_permission.permission_viewset import PermissionViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, CreateModelMixin
from rest_framework import permissions

class UploadingTaskViewSet(
    PermissionViewSet, CreateModelMixin,
    RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
):
    permission_classes = [permissions.IsAuthenticated]
