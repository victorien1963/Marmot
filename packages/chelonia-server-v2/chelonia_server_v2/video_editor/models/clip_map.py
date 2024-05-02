from django.db import models
from clip.models import Clip
from .video_editing_job import VideoEditingJob


class ClipMap(models.Model):
    source_job = models.ForeignKey(to=VideoEditingJob, on_delete=models.CASCADE)
    source_clip = models.ForeignKey(to=Clip, on_delete=models.CASCADE)
    order = models.IntegerField()
