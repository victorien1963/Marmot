from rest_framework import routers
import core.views as views
from django.urls import path, include


__router = routers.SimpleRouter()
__router.register(r'processing-task', views.ProcessingTaskViewSet)
__router.register(r'subtitle', views.SubtitleViewSet)

urlpatterns = [
    path('core/', include(__router.urls))
]