from chelonia_account.models import User
from django.db.models import Model, QuerySet
from .protected_filter import ProtectedFilter
from .protected_create import ProtectedCreate
from .protected_get_or_create import ProtectedGetOrCreate
from .protected_update_or_create import ProtectedUpdateOrCreate
from .protected_get import ProtectedGet


class Proxy:
    def __init__(self, user: User, source_model: type(Model)):
        self.__user = user
        self.__source_model = source_model

    def filter(self, *args, **kwargs) -> QuerySet:
        return ProtectedFilter(user=self.__user, source_model=self.__source_model).protected_filter(*args, **kwargs)

    def get(self, *args, **kwargs) -> QuerySet:
        return ProtectedGet(user=self.__user, source_model=self.__source_model).protected_get(*args, **kwargs)

    def create(self, *args, **kwargs) -> Model:
        return ProtectedCreate(user=self.__user, source_model=self.__source_model).protected_create(*args, **kwargs)

    def get_or_create(self, *args, **kwargs) -> (Model, bool):
        return ProtectedGetOrCreate(user=self.__user, source_model=self.__source_model).protected_get_or_create(*args, **kwargs)

    def update_or_create(self, *args, **kwargs) -> (Model, bool):
        return ProtectedUpdateOrCreate(user=self.__user, source_model=self.__source_model).protected_update_or_create(*args, **kwargs)

    @property
    def model(self):
        return self.__source_model
