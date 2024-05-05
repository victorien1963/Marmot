from rest_framework import routers
from .subtitle_generation_task_viewset import SubtitleGenerationTaskViewSet
from .subtitle_management_viewset import SubtitleManagementViewSet
from django.conf import settings

router = routers.SimpleRouter()
router.register(fr"{settings.WORKER_API_PREFIX}/subtitle/subtitle-generation-task", SubtitleGenerationTaskViewSet)
router.register(fr"{settings.WORKER_API_PREFIX}/subtitle/management", SubtitleManagementViewSet)

urlpatterns = router.urls
