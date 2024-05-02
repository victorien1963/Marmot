import uuid

from django.db import models
from utilities.model import SoftDeleteModelBase


class TaskBase(SoftDeleteModelBase):
    task_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    task_status = models.CharField()
    description = models.TextField(blank=True, default="")

    class Meta:
        abstract = True

