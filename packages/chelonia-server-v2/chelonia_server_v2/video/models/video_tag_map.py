from django.db import models
from .video import Video
from tag.models import Tag


class VideoTagMap(models.Model):
    source_video = models.ForeignKey(Video, on_delete=models.CASCADE)
    source_tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
