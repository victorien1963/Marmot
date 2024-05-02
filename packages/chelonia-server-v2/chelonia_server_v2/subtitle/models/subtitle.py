import uuid

from django.db import models
from video.models import Video


class Subtitle(models.Model):
    subtitle_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    source_video = models.ForeignKey(to=Video, on_delete=models.CASCADE)

    start = models.FloatField()
    end = models.FloatField()
    text = models.TextField()