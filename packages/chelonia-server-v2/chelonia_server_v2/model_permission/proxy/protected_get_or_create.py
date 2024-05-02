from .proxy_operation_base import ProxyOperationBase
from .protected_filter import ProtectedFilter
from django.db.models import Model


class ProtectedGetOrCreate(ProxyOperationBase):
    def protected_get_or_create(self, *args, **kwargs) -> (Model, bool):
        model_object, created = ProtectedFilter(
            user=self._user, source_model=self._source_model
        ).protected_filter().get_or_create(*args, **kwargs)

        if created is True and self._model_protected is True:
            protected_model = self._get_protected_model()
            protected_model.objects.create(user=self._user, target=model_object)

        return model_object, created
