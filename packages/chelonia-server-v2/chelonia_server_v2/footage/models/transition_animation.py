from django.db import models
from artifact.models import Artifact
import uuid
from utilities.model import SoftDeleteModelBase


class TransitionAnimation(SoftDeleteModelBase):
    transition_animation_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_artifact = models.OneToOneField(to=Artifact, on_delete=models.CASCADE)

    name = models.TextField()
    description = models.TextField(null=True, blank=True)

    duration = models.IntegerField(default=0)
