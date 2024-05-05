from django.db import models
from video.models import Video
from task.models import CommonTaskBase


class VideoSubtitleExportingTask(CommonTaskBase):
    source_video = models.ForeignKey(to=Video, on_delete=models.CASCADE)
