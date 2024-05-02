from django.db import models
from .processing_task import ProcessingTask


class Subtitle(models.Model):
    processing_task = models.ForeignKey(ProcessingTask, on_delete=models.CASCADE)
    start = models.FloatField()
    end = models.FloatField()
    text = models.TextField()
