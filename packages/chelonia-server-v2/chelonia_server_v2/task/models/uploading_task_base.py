from django.db import models
from .task_base import TaskBase


class UploadingTaskStatus(models.TextChoices):
    CREATED = "CREATED"
    UPLOADING = "UPLOADING"
    UPLOADED = "UPLOADED"
    MOVING = "MOVING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class UploadingTaskBase(TaskBase):
    task_status = models.CharField(choices=UploadingTaskStatus.choices, default=UploadingTaskStatus.CREATED)
    filename = models.TextField()
    extension = models.CharField(max_length=32)

    upload_path = models.TextField()
    store_path = models.TextField()

    upload_link = models.TextField()

    class Meta:
        abstract = True
