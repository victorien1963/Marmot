import uuid

from artifact.models import ExportedArtifact
from .clip import Clip
from django.db import models


class ExportedClipMap(models.Model):
    # 1 clip will only have 1 exported artifact
    exported_clip_map_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_clip = models.OneToOneField(to=Clip, on_delete=models.CASCADE)
    exported_artifact = models.ForeignKey(to=ExportedArtifact, on_delete=models.CASCADE)
