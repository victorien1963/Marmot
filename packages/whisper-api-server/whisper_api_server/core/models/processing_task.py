from django.db import models


class ProcessingStatus(models.TextChoices):
    CREATED = "CREATED"
    PROCESSING = "PROCESSING"
    FINISHED = "FINISHED"
    FAILED = "FAILED"


class LanguageDetection(models.TextChoices):
    AUTO = "auto"
    ENGLISH = "en"
    MANDARIN = "zh"
    JAPANESE = "jp"
    DEUTSCH = "de"
    FRANCIS = "fr"

class ProcessingTask(models.Model):
    # basic task information
    bucket_name = models.TextField()
    path = models.TextField()

    processing_status = models.CharField(choices=ProcessingStatus.choices, default=ProcessingStatus.CREATED)
    details = models.TextField(default="")

    # transcribe configu
    language_detection = models.CharField(choices=LanguageDetection.choices, default=LanguageDetection.AUTO)
    word_level_timestamps = models.BooleanField(default=False)
    # merge sentence config
    merge_sentences = models.BooleanField(default=False)
    max_gap_between_sentences_ms = models.IntegerField(default=50)
    # vad filter config
    vad_filter = models.BooleanField(default=False)
    vad_filter_silence_duration_ms = models.FloatField(default=50)

    class Meta:
        unique_together = ('bucket_name', 'path')
