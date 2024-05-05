from .proxy_operation_base import ProxyOperationBase
from .protected_filter import ProtectedFilter
from django.db.models import Model


class ProtectedUpdateOrCreate(ProxyOperationBase):
    def protected_update_or_create(self, defaults=None, create_defaults=None, **kwargs) -> (Model, bool):
        model_object, created = ProtectedFilter(
            user=self._user, source_model=self._source_model
        ).protected_filter().update_or_create(defaults=defaults, create_defaults=create_defaults, **kwargs)

        if created is True and self._model_protected is True:
            protected_model = self._get_protected_model()
            protected_model.objects.create(user=self._user, target=model_object)

        return model_object, created
