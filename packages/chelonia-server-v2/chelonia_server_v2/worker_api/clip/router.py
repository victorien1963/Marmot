from rest_framework import routers
from .clip_exporting_task_viewset import ClipExportingTaskViewSet
from .exported_clip_viewset import ExportedClipViewSet
from django.conf import settings


router = routers.SimpleRouter()
router.register(fr"{settings.WORKER_API_PREFIX}/clip/clip-exporting-task", ClipExportingTaskViewSet)
router.register(fr"{settings.WORKER_API_PREFIX}/clip/exported-clip", ExportedClipViewSet)

urlpatterns = router.urls
