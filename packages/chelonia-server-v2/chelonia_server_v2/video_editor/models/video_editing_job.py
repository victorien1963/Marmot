import uuid
from django.db import models
from video.models import Video


class AspectRatio(models.TextChoices):
    HORIZONTAL = "Horizontal_16_9"
    VERTICAL = "Vertical_9_16"
    SQUARE = "Square_1_1"
    SOCIAL = "Social_4_5"


class VideoEditingJob(models.Model):
    job_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    source_video = models.ForeignKey(to=Video, on_delete=models.CASCADE)
    aspect_ratio = models.TextField(choices=AspectRatio.choices, default=AspectRatio.HORIZONTAL)

    name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True)
