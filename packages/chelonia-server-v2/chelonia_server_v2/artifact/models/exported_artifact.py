from django.db import models
from .artifact import Artifact


class ExportedArtifact(Artifact):
    expires_at = models.DateTimeField()
