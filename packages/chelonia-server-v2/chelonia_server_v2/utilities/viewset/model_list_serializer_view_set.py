from rest_framework import viewsets


class ModelListSerializerViewSet(viewsets.GenericViewSet):
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True

        return super().get_serializer(*args, **kwargs)
