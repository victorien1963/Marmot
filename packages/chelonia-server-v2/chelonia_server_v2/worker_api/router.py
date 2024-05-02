from .video.router import urlpatterns as video_urls
from .footage.router import urlpatterns as footage_urls
from .clip.router import urlpatterns as clip_urls
from .subtitle.router import urlpatterns as subtitle_urls

url_patterns = video_urls + footage_urls + clip_urls + subtitle_urls