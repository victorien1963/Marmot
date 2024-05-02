from rest_framework import permissions
from chelonia_account.models import UserType


class WorkerAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == UserType.WORKER

    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.user_type == UserType.WORKER
