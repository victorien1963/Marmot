from .clip import Clip
from task.models import CommonTaskBase
from django.db import models

class ClipExportingTask(CommonTaskBase):
    source_clip = models.ForeignKey(to=Clip, on_delete=models.CASCADE)
    exported_clip_expired_at = models.PositiveIntegerField()
    path_to_export = models.TextField()
