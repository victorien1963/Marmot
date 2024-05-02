from rest_framework import routers

from .subtitle_management_viewset import SubtitleManagementViewSet

router = routers.SimpleRouter()
router.register(r"subtitle/management", SubtitleManagementViewSet)

urlpatterns = router.urls
