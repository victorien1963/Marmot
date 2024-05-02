from subtitle.models import Subtitle, SubtitleGenerationTask
from subtitle.models import ExportedVideoSubtitle, VideoSubtitleExportingTask
from subtitle.models import ExportedClipSubtitle, ClipSubtitleExportingTask
from django.db import models
from .permission_base import PermissionBase


class ProtectedSubtitle(PermissionBase):
    target = models.OneToOneField(to=Subtitle, on_delete=models.CASCADE)


class ProtectedSubtitleGenerationTask(PermissionBase):
    target = models.OneToOneField(to=SubtitleGenerationTask, on_delete=models.CASCADE)


class ProtectedExportedVideoSubtitle(PermissionBase):
    target = models.OneToOneField(to=ExportedVideoSubtitle, on_delete=models.CASCADE)


class ProtectedVideoSubtitleExportingTask(PermissionBase):
    target = models.OneToOneField(to=VideoSubtitleExportingTask, on_delete=models.CASCADE)


class ProtectedExportedClipSubtitle(PermissionBase):
    target = models.OneToOneField(to=ExportedClipSubtitle, on_delete=models.CASCADE)


class ProtectedClipSubtitleExportingTask(PermissionBase):
    target = models.OneToOneField(to=ClipSubtitleExportingTask, on_delete=models.CASCADE)