from django.db.models import Model
import model_permission.models as protected_models
import inspect
from utilities.viewset import ModelListSerializerViewSet


class PermissionViewSet(ModelListSerializerViewSet):
    model_protected: bool = False
    protected_model: Model = None
    protected_object_id_query = None

    @classmethod
    def as_view(cls, actions=None, **initkwargs):
        protected_model_name = cls.__get_protected_model_name(cls.queryset.model)
        cls.model_protected = cls._check_model_protected(protected_model_name)
        cls.protected_model = cls._get_protected_model(protected_model_name) if cls.model_protected else None

        return super().as_view(actions, **initkwargs)

    def get_queryset(self):
        target_qs = self.queryset

        if self.model_protected:
            protected_object_ids = self.protected_model.objects \
                .filter(user=self.request.user) \
                .only("target_id") \
                .values_list('target_id', flat=True)
            target_qs = self.queryset.filter(pk__in=protected_object_ids)

        return target_qs

    @staticmethod
    def __get_protected_model_name(source_model: type(Model)) -> str:
        source_model_name = source_model.__name__
        protected_model_name = f"Protected{source_model_name}"

        return protected_model_name

    @staticmethod
    def _check_model_protected(protected_model_name: str) -> bool:
        for name, prop in inspect.getmembers(protected_models):
            if name == protected_model_name:
                return True
        return False # protected model not found

    @staticmethod
    def _get_protected_model(protected_model_name: str) -> Model:
        return getattr(protected_models, protected_model_name)
