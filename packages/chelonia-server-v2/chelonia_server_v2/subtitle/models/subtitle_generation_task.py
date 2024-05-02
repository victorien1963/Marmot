from django.db import models
from task.models import CommonTaskBase
from video.models import Video
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator


class SubtitleGenerationTask(CommonTaskBase):
    source_video = models.ForeignKey(to=Video, on_delete=models.CASCADE)

    # transcribe config
    language = models.CharField(max_length=2, null=True, blank=True)
    # prompt for ChatGPT
    prompt = models.CharField(max_length=244, null=True, blank=True)
    # response format
    response_format = models.CharField(max_length=16, null=True, blank=True)
    # sampling temperature
    temperature = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(1)])
    # timestamp granularities
    timestamp_granularities = ArrayField(models.CharField(max_length=16))

    # audio file temporary storage path
    temp_audio_file_path = models.TextField()
