from rest_framework import routers

from .transition_animation_uploading_task_viewset import TransitionAnimationUploadingTaskViewSet
from .transtion_animation_management_viewset import TransitionAnimationManagementViewSet
from .watermark_uploading_task_viewset import WatermarkUploadingTaskViewSet
from .watermark_management_viewset import WatermarkManagementViewSet

router = routers.SimpleRouter()
router.register(r"footage/transition-animation-uploading-task", TransitionAnimationUploadingTaskViewSet)
router.register(r"footage/transition-animation/management", TransitionAnimationManagementViewSet)
router.register(r"footage/watermark-uploading-task", WatermarkUploadingTaskViewSet)
router.register(r"footage/watermark/management", WatermarkManagementViewSet)

urlpatterns = router.urls
