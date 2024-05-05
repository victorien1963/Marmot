from clip.models import Clip, ClipTagMap, ClipExportingTask, ExportedClipMap
from django.db import models
from .permission_base import PermissionBase


class ProtectedClip(PermissionBase):
    target = models.OneToOneField(to=Clip, on_delete=models.CASCADE)


class ProtectedClipTagMap(PermissionBase):
    target = models.OneToOneField(to=ClipTagMap, on_delete=models.CASCADE)


class ProtectedClipExportingTask(PermissionBase):
    target = models.OneToOneField(to=ClipExportingTask, on_delete=models.CASCADE)


class ProtectedExportedClipMap(PermissionBase):
    target = models.OneToOneField(to=ExportedClipMap, on_delete=models.CASCADE)
