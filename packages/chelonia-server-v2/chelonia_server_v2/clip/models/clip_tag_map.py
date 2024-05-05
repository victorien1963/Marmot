from django.db import models
from .clip import Clip
from tag.models import Tag


class ClipTagMap(models.Model):
    source_clip = models.ForeignKey(Clip, on_delete=models.CASCADE)
    source_tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
