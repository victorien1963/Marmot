from rest_framework import routers
from .video_uploading_task_viewset import VideoUploadingTaskViewSet
from .video_management_viewset import VideoManagementViewSet
from django.conf import settings

router = routers.SimpleRouter()
router.register(fr"{settings.WORKER_API_PREFIX}/video/video-uploading-task", VideoUploadingTaskViewSet)
router.register(fr"{settings.WORKER_API_PREFIX}/video/management", VideoManagementViewSet)

urlpatterns = router.urls
