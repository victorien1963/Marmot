from rest_framework import routers
from .transition_animation_uploading_task_viewset import TransitionAnimationUploadingTaskViewSet
from .transition_animation_management_viewset import TransitionAnimationManagementViewSet
from .watermark_uploading_task_viewset import WatermarkUploadingTaskViewSet
from .watermark_management_viewset import WatermarkManagementViewSet
from django.conf import settings


router = routers.SimpleRouter()
router.register(fr"{settings.WORKER_API_PREFIX}/footage/transition-animation/management", TransitionAnimationManagementViewSet)
router.register(fr"{settings.WORKER_API_PREFIX}/footage/transition-animation-uploading-task", TransitionAnimationUploadingTaskViewSet)

router.register(fr"{settings.WORKER_API_PREFIX}/footage/watermark/management", WatermarkManagementViewSet)
router.register(fr"{settings.WORKER_API_PREFIX}/footage/watermark-uploading-task", WatermarkUploadingTaskViewSet)

urlpatterns = router.urls
