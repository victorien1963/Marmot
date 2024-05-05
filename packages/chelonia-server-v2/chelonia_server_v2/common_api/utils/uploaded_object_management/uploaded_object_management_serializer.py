from rest_framework import serializers
from utilities.object_store import ObjectStore
from datetime import datetime, timedelta
from django.conf import settings


class UploadedObjectManagementSerializer(serializers.ModelSerializer):
    view_url = serializers.SerializerMethodField()
    view_url_expiration_at = serializers.SerializerMethodField()

    class Meta:
        fields = ["name", "description", "view_url", "view_url_expiration_at"]
        read_only_fields = ["view_url", "view_url_expiration_at"]

    def get_view_url(self, obj):
        source_artifact_path = obj.source_artifact.path
        return ObjectStore().generate_view_info(source_artifact_path)

    def get_view_url_expiration_at(self,obj):
        return datetime.now() + timedelta(seconds=settings.VIEW_EXPIRE)
