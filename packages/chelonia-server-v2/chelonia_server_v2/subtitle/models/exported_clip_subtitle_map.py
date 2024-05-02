from django.db import models
from clip.models import Clip
from artifact.models import ExportedArtifact


class ExportedClipSubtitle(models.Model):
    source_clip = models.ForeignKey(to=Clip, on_delete=models.CASCADE)
    exported_subtitle = models.ForeignKey(to=ExportedArtifact, on_delete=models.CASCADE)
