from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.db import models


class UserType(models.TextChoices):
    ADMIN = 'ADMIN'
    WORKER = 'WORKER'
    COMMON = 'COMMON'


class User(AbstractUser):
    user_type = models.TextField(choices=UserType.choices, default=UserType.COMMON)
    username_validator = ASCIIUsernameValidator()
