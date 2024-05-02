from rest_framework import serializers
from core.models import Subtitle


class SubtitleSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        validated_data.pop('processing_task')

        return super().update(instance, validated_data)

    class Meta:
        model = Subtitle
        fields = ["processing_task", "start", "end", "text"]
