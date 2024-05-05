from rest_framework import serializers
from rest_framework import validators
from core.models import ProcessingTask
from core.models import ProcessingStatus
import logging
from copy import copy

class ProcessingTaskSerializer(serializers.ModelSerializer):

    def run_validators(self, value):
        for validator in copy(self.validators):
            if isinstance(validator, validators.UniqueTogetherValidator):
                self.validators.remove(validator)

        super().run_validators(value)

    def create(self, validated_data):
        task, created = ProcessingTask.objects.get_or_create(**validated_data)

        if created is False:
            logging.info(f"Processing Task {task.id} exists and in status {task.processing_status}. Delete it and re-create new one.")
            task.delete()
            task = ProcessingTask.objects.create(**validated_data)
            task.save()

        logging.info(f"Processing Task {task.id} created.")

        return task


    def update(self, instance, validated_data):
        validated_data.pop('bucket_name', None)
        validated_data.pop('path', None)

        return super().update(instance, validated_data)


    class Meta:
        model = ProcessingTask
        fields = [
            # basic information
            "id", "bucket_name", "path", "processing_status", "details",

            # transcribe config
            "language_detection", "word_level_timestamps",
            # merge sentence config
            "merge_sentences", "max_gap_between_sentences_ms",
            # vad filter config
            "vad_filter", "vad_filter_silence_duration_ms"
        ]
        read_only_fields = ["id"]
