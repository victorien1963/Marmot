from .artifact import ProtectedArtifact, ProtectedExportedArtifact
from .tag import ProtectedTag
from .video import ProtectedVideo, ProtectedVideoTagMap, ProtectedVideoUploadingTask
from .clip import ProtectedClip, ProtectedClipTagMap, ProtectedExportedClipMap, ProtectedClipExportingTask
from .footage import (
    ProtectedWatermark, ProtectedWatermarkUploadingTask,
    ProtectedTransitionAnimation, ProtectedTransitionAnimationUploadingTask
)
from .subtitle import (
    ProtectedSubtitle, ProtectedSubtitleGenerationTask,
    ProtectedExportedVideoSubtitle, ProtectedExportedClipSubtitle,
    ProtectedVideoSubtitleExportingTask, ProtectedClipSubtitleExportingTask
)

