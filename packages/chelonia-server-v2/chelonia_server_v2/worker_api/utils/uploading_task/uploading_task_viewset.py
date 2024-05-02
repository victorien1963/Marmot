from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from utilities.viewset import SoftDeleteModelMixin
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.response import Response


class UploadingTaskViewSet(
    GenericViewSet,
    RetrieveModelMixin, UpdateModelMixin, SoftDeleteModelMixin, ListModelMixin
):
    permission_classes = [permissions.AllowAny]
    filterset_fields = ["task_status", "created_at"]

    @action(detail=False, methods=["get"], url_path='expired')
    def get_expired(self, request):
        expire_time = datetime.now() - timedelta(seconds=settings.UPLOAD_EXPIRE)
        expired_video_uploading_task = self.queryset.filter(created_at__lte=expire_time)

        page = self.paginate_queryset(expired_video_uploading_task)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(expired_video_uploading_task, many=True)
        return Response(serializer.data)