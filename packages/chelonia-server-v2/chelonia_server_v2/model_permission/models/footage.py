from footage.models import Watermark, WatermarkUploadingTask
from footage.models import TransitionAnimation, TransitionAnimationUploadingTask
from django.db import models
from .permission_base import PermissionBase


class ProtectedWatermark(PermissionBase):
    target = models.OneToOneField(to=Watermark, on_delete=models.CASCADE)


class ProtectedWatermarkUploadingTask(PermissionBase):
    target = models.OneToOneField(to=WatermarkUploadingTask, on_delete=models.CASCADE)

class ProtectedTransitionAnimation(PermissionBase):
    target = models.OneToOneField(to=TransitionAnimation, on_delete=models.CASCADE)


class ProtectedTransitionAnimationUploadingTask(PermissionBase):
    target = models.OneToOneField(to=TransitionAnimationUploadingTask, on_delete=models.CASCADE)
