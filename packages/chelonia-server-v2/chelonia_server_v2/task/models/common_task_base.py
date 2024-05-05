from django.db import models
from utilities.model import SoftDeleteModelBase
from .task_base import TaskBase


class CommonTaskStatus(models.TextChoices):
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class CommonTaskBase(TaskBase):
    task_status = models.CharField(choices=CommonTaskStatus.choices, default=CommonTaskStatus.CREATED)

    class Meta:
        abstract = True
