from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, CreateModelMixin
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from rest_framework.response import Response


class UploadedObjectManagementViewSet(
    GenericViewSet, CreateModelMixin,
    RetrieveModelMixin, ListModelMixin
):
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        task_id = request.data.pop("task_id")
        serializer = self.get_serializer(data=request.data)
        serializer.context["task_id"] = task_id

        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
