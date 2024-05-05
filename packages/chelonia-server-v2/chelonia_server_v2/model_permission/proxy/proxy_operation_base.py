import model_permission.models as protected_models
from django.db.models import Model
import inspect


class ProxyOperationBase:
    def __init__(self, user, source_model: type(Model)):
        self._user = user
        self._source_model = source_model
        self.__protected_model_name = self.__get_protected_model_name(source_model)
        self._model_protected = self.__check_protected()

    def __check_protected(self):
        for name, prop in inspect.getmembers(protected_models):
            if name == self.__protected_model_name:
                return True
        return False # protected model not found

    def _get_protected_model(self) -> Model:
        return getattr(protected_models, self.__protected_model_name)

    @staticmethod
    def __get_protected_model_name(source_model: type(Model)) -> str:
        source_model_name = source_model.__name__
        protected_model_name = f"Protected{source_model_name}"

        return protected_model_name
