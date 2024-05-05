from video.models import Video, VideoTagMap, VideoUploadingTask
from django.db import models
from .permission_base import PermissionBase


class ProtectedVideo(PermissionBase):
    target = models.OneToOneField(to=Video, on_delete=models.CASCADE)


class ProtectedVideoTagMap(PermissionBase):
    target = models.OneToOneField(to=VideoTagMap, on_delete=models.CASCADE)


class ProtectedVideoUploadingTask(PermissionBase):
    target = models.OneToOneField(to=VideoUploadingTask, on_delete=models.CASCADE)
