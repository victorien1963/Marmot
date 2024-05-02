from django.db import models
from datetime import datetime
import logging


class SoftDeleteQuerySet(models.QuerySet):
    def soft_delete(self):
        logging.info(f"Soft delete {self}")
        self.update(deleted=True, deleted_at=datetime.now())


class SoftDeleteModelBase(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True)

    objects = SoftDeleteQuerySet.as_manager()

    def soft_delete(self):
        logging.info(f"Soft delete {self}")
        self.deleted = True
        self.deleted_at = datetime.now()
        self.save()

    class Meta:
        abstract = True