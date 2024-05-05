from rest_framework.renderers import JSONRenderer


class JsonDataRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if hasattr(data, 'keys') and "data" not in data.keys():
            wrapped_data = {"data": data}
        else:
            wrapped_data = data

        return super().render(
            data=wrapped_data, accepted_media_type=accepted_media_type, renderer_context=renderer_context
        )
