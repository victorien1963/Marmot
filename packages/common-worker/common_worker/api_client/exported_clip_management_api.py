from .api_client_base import APIClientBase
from utils.logger import DefaultLogger


class ExportedClipManagementAPI(APIClientBase):
    def get_expired_exported_clip(self):
        DefaultLogger().info(f"Get expired exported clips")
        target_url = self._url + "expired"
        self.get_by_url(target_url)

    def delete_exported_clip(self, clip_id):
        DefaultLogger().info(f"Delete the expired clip {clip_id}")
        self.delete(clip_id)
