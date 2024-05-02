from video_editor.models import VideoEditingJob
from video_editor.models import ClipMap, TransitionAnimationMap, VideoSliceMap, WatermarkMap
from django.db import models
from .permission_base import PermissionBase


class ProtectedVideoEditingJob(PermissionBase):
    target = models.OneToOneField(to=VideoEditingJob, on_delete=models.CASCADE)


class ProtectedClipMap(PermissionBase):
    target = models.OneToOneField(to=ClipMap, on_delete=models.CASCADE)


class ProtectedTransitionAnimationMap(PermissionBase):
    target = models.OneToOneField(to=TransitionAnimationMap, on_delete=models.CASCADE)


class ProtectedVideoSliceMap(PermissionBase):
    target = models.OneToOneField(to=VideoSliceMap, on_delete=models.CASCADE)


class ProtectedWatermarkMap(PermissionBase):
    target = models.OneToOneField(to=WatermarkMap, on_delete=models.CASCADE)
