from artifact.models import Artifact, ExportedArtifact
from django.db import models
from .permission_base import PermissionBase


class ProtectedArtifact(PermissionBase):
    target = models.OneToOneField(to=Artifact, on_delete=models.CASCADE)

class ProtectedExportedArtifact(PermissionBase):
    target = models.OneToOneField(to=ExportedArtifact, on_delete=models.CASCADE)
