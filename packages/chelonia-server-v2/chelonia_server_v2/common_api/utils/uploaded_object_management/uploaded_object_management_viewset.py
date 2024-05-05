from model_permission.permission_viewset import PermissionViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin
from utilities.viewset import SoftDeleteModelMixin
from rest_framework import permissions


class UploadedObjectManagementViewSet(PermissionViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, SoftDeleteModelMixin):
    permission_classes = [permissions.IsAuthenticated]
