from django.db import models
from footage.models import TransitionAnimation
from .video_editing_job import VideoEditingJob


class TransitionAnimationMap(models.Model):
    source_job = models.ForeignKey(to=VideoEditingJob, on_delete=models.CASCADE)
    source_transition_animation = models.ForeignKey(to=TransitionAnimation, on_delete=models.CASCADE)

    order = models.IntegerField()
