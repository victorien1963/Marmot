from rest_framework.mixins import CreateModelMixin


class PermissionCreateModelMixin(CreateModelMixin):
    def perform_create(self, serializer):
        instance = serializer.save()
        if self.model_protected:
            self.protected_model.objects.create(user=self.request.user, target=instance)
