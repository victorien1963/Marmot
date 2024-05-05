from django.db import models
from footage.models import Watermark
from .video_editing_job import VideoEditingJob


class WatermarkMap(models.Model):
    source_job = models.ForeignKey(to=VideoEditingJob, on_delete=models.CASCADE)
    source_watermark = models.ForeignKey(to=Watermark, on_delete=models.CASCADE)
