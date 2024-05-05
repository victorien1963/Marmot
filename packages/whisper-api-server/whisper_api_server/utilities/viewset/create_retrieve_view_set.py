from rest_framework import mixins
from rest_framework import viewsets


class CreateRetrieveViewSet(mixins.CreateModelMixin,
                                mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet,
                                mixins.UpdateModelMixin):
    """
    A viewset that provides `retrieve`, `create`, and `list` actions.

    To use it, override the class and set the `.queryset` and
    `.serializer_class` attributes.
    """
    pass

    # def get_serializer(self, *args, **kwargs):
    #     if isinstance(kwargs.get('data', {}), list):
    #         kwargs['many'] = True
    #
    #     return super().get_serializer(*args, **kwargs)
