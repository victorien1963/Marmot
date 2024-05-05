from tag.models import Tag
from django.db import models
from .permission_base import PermissionBase


class ProtectedTag(PermissionBase):
    target = models.OneToOneField(to=Tag, on_delete=models.CASCADE)
