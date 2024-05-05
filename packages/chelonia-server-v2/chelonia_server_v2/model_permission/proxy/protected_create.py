from .proxy_operation_base import ProxyOperationBase
from django.db.models import Model


class ProtectedCreate(ProxyOperationBase):
    def protected_create(self, *args, **kwargs) -> Model:
        model_object = self._source_model.objects.create(*args, **kwargs)

        if self._model_protected is True:
            protected_model = self._get_protected_model()
            protected_model.objects.create(user=self._user, target=model_object)

        return model_object
