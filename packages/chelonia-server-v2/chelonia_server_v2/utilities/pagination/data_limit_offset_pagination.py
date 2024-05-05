from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param, remove_query_param



class DataLimitOffsetPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'data': data
        })

    def get_next_link(self):
        if self.offset + self.limit >= self.count:
            return None

        path = self.request.get_full_path()
        path = replace_query_param(path, self.limit_query_param, self.limit)
        offset = self.offset + self.limit
        return replace_query_param(path, self.offset_query_param, offset)

    def get_previous_link(self):
        if self.offset <= 0:
            return None

        path = self.request.get_full_path()
        path = replace_query_param(path, self.limit_query_param, self.limit)

        if self.offset - self.limit <= 0:
            return remove_query_param(path, self.offset_query_param)

        offset = self.offset - self.limit
        return replace_query_param(path, self.offset_query_param, offset)