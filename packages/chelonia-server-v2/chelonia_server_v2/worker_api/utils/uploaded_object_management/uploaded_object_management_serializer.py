from rest_framework import serializers
from artifact.models import Artifact
from model_permission.proxy import Proxy
from rest_framework.exceptions import APIException
from rest_framework import status
import logging


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ["artifact_id", "path", "artifact_format", "artifact_size", "created_at"]
        read_only_fields = ["artifact_id", "created_at"]


class UploadedObjectManagementSerializer(serializers.ModelSerializer):
    source_artifact = ArtifactSerializer()
    protected_uploading_task_model = None

    class Meta:
        model = None
        object_id_field: str
        fields = ["name", "source_artifact"]

    def create(self, validated_data):
        source_task = self.__get_source_task()
        source_user = source_task.user
        task_id = source_task.target_id

        source_artifact = validated_data.pop("source_artifact")
        path = source_artifact["path"]
        artifact_format = source_artifact["artifact_format"]
        artifact_size = source_artifact["artifact_size"]
        name = validated_data.pop("name")

        self.__check_artifact_exists(
            user=source_user, task_id=task_id, path=path,artifact_format=artifact_format, artifact_size=artifact_size)
        self.__check_target_already_exists(source_user=source_user, task_id=task_id, name=name)

        artifact = Proxy(user=source_user, source_model=Artifact).create(
            artifact_id=task_id, path=path, artifact_format=artifact_format, artifact_size=artifact_size
        )

        uploaded_object = Proxy(user=source_user, source_model=self.Meta.model).create(
            **{self.Meta.object_id_field: task_id, "name": name, "source_artifact": artifact}
        )

        return uploaded_object

    def __get_source_task(self):
        task_id = self.context["task_id"]
        protected_uploading_task = self.protected_uploading_task_model.objects.get(target=task_id)

        return protected_uploading_task

    def __check_artifact_exists(self, user, task_id, path, artifact_format, artifact_size):
        if Proxy(user=user, source_model=Artifact).filter(
                artifact_id=task_id, path=path, artifact_format=artifact_format, artifact_size=artifact_size).exists():
            self.__raise_custom_validation_error(detail=f"Artifact {task_id} already exists", code="artifact_exists")

    def __check_target_already_exists(self, source_user, task_id, name):
        if Proxy(user=source_user, source_model=self.Meta.model).filter(
                **{self.Meta.object_id_field: task_id, "name": name}).exists():
            self.__raise_custom_validation_error(detail=f"Target {task_id} already exists", code="target_already_exists")

    @staticmethod
    def __raise_custom_validation_error(detail, code):
        exception = APIException(detail=detail, code=code)
        exception.status_code = status.HTTP_400_BAD_REQUEST
        raise exception