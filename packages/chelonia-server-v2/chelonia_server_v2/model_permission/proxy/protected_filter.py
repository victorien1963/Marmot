from .proxy_operation_base import ProxyOperationBase
from django.db.models import QuerySet


class ProtectedFilter(ProxyOperationBase):
    def protected_filter(self, *args, **kwargs) -> QuerySet:
        if self._model_protected is True:
            protected_model = self._get_protected_model()
            protected_object_ids = protected_model.objects.filter(user=self._user).only("target_id").values_list('target_id', flat=True)
            return self._source_model.objects.filter(pk__in=protected_object_ids).filter(*args, **kwargs)

        else:
            return self._source_model.objects
