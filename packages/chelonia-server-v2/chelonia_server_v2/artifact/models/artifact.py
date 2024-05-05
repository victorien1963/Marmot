from django.db import models
from utilities.model import SoftDeleteModelBase
import uuid


class Artifact(SoftDeleteModelBase):
    artifact_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    path = models.TextField()

    artifact_format = models.CharField(max_length=32)
    artifact_size = models.BigIntegerField()
