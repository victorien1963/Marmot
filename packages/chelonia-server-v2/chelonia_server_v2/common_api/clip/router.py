from rest_framework import routers

from .clip_management_viewset import ClipManagementViewSet

router = routers.SimpleRouter()
router.register(r"clip/management", ClipManagementViewSet)

urlpatterns = router.urls
