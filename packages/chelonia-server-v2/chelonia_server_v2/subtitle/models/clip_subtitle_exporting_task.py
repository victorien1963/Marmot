from django.db import models
from clip.models import Clip
from task.models import CommonTaskBase


class ClipSubtitleExportingTask(CommonTaskBase):
    source_clip = models.ForeignKey(to=Clip, on_delete=models.CASCADE)
