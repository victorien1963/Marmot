import uuid
from django.db import models
from video.models import Video
from django.core.exceptions import ValidationError
from utilities.model import SoftDeleteModelBase


class Clip(SoftDeleteModelBase):
    clip_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_video = models.ForeignKey(to=Video, on_delete=models.CASCADE)
    start = models.PositiveIntegerField()
    end = models.PositiveIntegerField()

    name = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def clean(self):
        if self.end <= self.start:
            raise ValidationError("End must be greater than start")
        
        super().clean()
