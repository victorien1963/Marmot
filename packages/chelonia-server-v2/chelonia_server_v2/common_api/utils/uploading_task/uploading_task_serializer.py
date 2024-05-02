from rest_framework import serializers
from model_permission.proxy import Proxy
from utilities.object_store import ObjectStore
from utilities.object_store import ObjectDirectory
from task.models import UploadingTaskStatus


class UploadingTaskSerializer(serializers.ModelSerializer):
    target_directory: ObjectDirectory = None
    allowed_status = [UploadingTaskStatus.UPLOADING, UploadingTaskStatus.UPLOADED]

    class Meta:
        fields = [
            "task_id", "upload_link",
            "task_status", "description", 'filename', 'extension'
        ]
        read_only_fields = ["task_id", "upload_link"]

    def create(self, validated_data):
        current_user = self.context['request'].user
        username = current_user.username
        filename = validated_data.pop("filename")
        extension = validated_data.pop("extension")

        object_filename, upload_path, saving_path, upload_link = ObjectStore().generate_upload_info(
            username=username, directory=self.target_directory, source_filename=filename, extension=extension
        )

        uploading_task = Proxy(user=current_user, source_model=self.__class__.Meta.model).create(
            task_id=object_filename, filename=filename, extension=extension,
            upload_path=upload_path, store_path=saving_path, upload_link=upload_link
        )

        return uploading_task

    def update(self, instance, validated_data):
        task_status = validated_data.pop("task_status")
        description = validated_data.pop("description", "")

        # Disallow user to change status/description of finished/failed/moving/uploaded tasks
        if task_status in self.allowed_status:
            instance.task_status = task_status
            instance.description = description

        instance.save()

        return instance
