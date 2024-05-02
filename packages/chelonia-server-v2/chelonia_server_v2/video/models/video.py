import uuid
from utilities.model import SoftDeleteModelBase
from django.db import models
from artifact.models import Artifact


class Video(SoftDeleteModelBase):
    video_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_artifact = models.OneToOneField(to=Artifact, on_delete=models.CASCADE)

    name = models.TextField()
    description = models.TextField(null=True, blank=True)

    taken_at = models.DateTimeField(null=True, blank=True)
    location = models.TextField(null=True, blank=True)
    duration = models.PositiveIntegerField(default=0)
