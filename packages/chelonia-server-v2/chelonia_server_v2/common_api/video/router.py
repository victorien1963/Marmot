from rest_framework import routers
from .video_uploading_task_viewset import VideoUploadingTaskViewSet
from .video_management_viewset import VideoManagementViewSet


router = routers.SimpleRouter()

router.register(r"video/video-uploading-task", VideoUploadingTaskViewSet)
router.register(r"video/management", VideoManagementViewSet)

urlpatterns = router.urls
