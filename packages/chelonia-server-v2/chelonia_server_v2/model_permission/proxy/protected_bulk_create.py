from .proxy_operation_base import ProxyOperationBase
from django.db.models import Model
from typing import List


class ProtectedBulkCreate(ProxyOperationBase):
    def protected_bulk_create(self, *args, **kwargs) -> List[Model]:
        model_objects = self._source_model.objects.bulk_create(*args, **kwargs)

        if self._model_protected is True:
            protected_model = self._get_protected_model()
            protected_model_objects = [protected_model(user=self._user, target=model_object) for model_object in model_objects]
            protected_model.objects.bulk_create(protected_model_objects)

        return model_objects
