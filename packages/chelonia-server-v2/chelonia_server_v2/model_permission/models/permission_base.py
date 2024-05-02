from django.db import models
from chelonia_account.models import User


class PermissionBase(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CharField)
    target = None

    class Meta:
        abstract = True
