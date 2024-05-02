from django.db import models
from video.models import Video
from artifact.models import ExportedArtifact


class ExportedVideoSubtitle(models.Model):
    source_clip = models.ForeignKey(to=Video, on_delete=models.CASCADE)
    exported_subtitle = models.ForeignKey(to=ExportedArtifact, on_delete=models.CASCADE)
