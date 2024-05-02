import os

# Connection information
FAILED_HTTP_RETRY_TIMES = int(os.environ.get("FAILED_HTTP_RETRY_TIMES", 5))

API_SERVER_URL = os.environ.get("API_SERVER_URL", "http://127.0.0.1:8000")
WORKER_API_PREFIX = os.environ.get("WORKER_API_PREFIX", "worker")
LOGIN_URL = f"{API_SERVER_URL}/auth/login"
WORKER_VIDEO_UPLOADING_TASK_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/video/video-uploading-task/"
WORKER_VIDEO_MANAGEMENT_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/video/management/"
WORKER_TRANSITION_ANIMATION_UPLOADING_TASK_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/footage/transition-animation-uploading-task/"
WORKER_TRANSITION_ANIMATION_MANAGEMENT_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/footage/transition-animation/management/"
WORKER_WATERMARK_UPLOADING_TASK_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/footage/watermark-uploading-task/"
WORKER_WATERMARK_MANAGEMENT_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/footage/watermark/management/"

# Object store configs
# Default is S3
CUSTOM_OBJECT_STORE_TYPE = os.environ.get("CUSTOM_OBJECT_STORE_TYPE", "S3")
# Use custom endpoint or not
CUSTOM_OBJECT_STORE_ENDPOINT = os.environ.get("CUSTOM_OBJECT_STORE_ENDPOINT", None)
# Bucket serves as root
OBJECT_STORE_BUCKET = os.environ.get("OBJECT_STORE_BUCKET")


CUSTOM_OBJECT_STORE_TYPE = os.environ.get("CUSTOM_OBJECT_STORE_TYPE", "MINIO")
CUSTOM_OBJECT_STORE_ENDPOINT = os.environ.get("CUSTOM_OBJECT_STORE_ENDPOINT", "http://localhost:9000")
OBJECT_STORE_BUCKET = os.environ.get("OBJECT_STORE_BUCKET", "chelonia")
os.environ["AWS_ACCESS_KEY_ID"] = "minioadmin"
os.environ["AWS_SECRET_ACCESS_KEY"] = "minioadmin"


# Execution worker number
# https://docs.python.org/zh-tw/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor
MAX_WORKERS = int(os.environ.get("MAX_WORKERS", 0)) if int(os.environ.get("MAX_WORKERS", 0)) > 0 else None
# Task scan interval, s
TASK_SCAN_INTERVAL = int(os.environ.get("TASK_SCAN_INTERVAL",10))
# Task dispatch interval, s
TASK_DISPATCH_INTERVAL = float(os.environ.get("TASK_DISPATCH_INTERVAL", 1))

# # boot time connection checking
# BOOT_RETRY_TIMES = int(os.environ.get("BOOT_RETRY_TIMES",60))
# # unit: second
# BOOT_RETRY_WAIT = int(os.environ.get("BOOT_RETRY_WAIT",1))
#
# WORKER_USER_NAME = os.environ.get("WORKER_USER")
# WORKER_USER_PASS = os.environ.get("WORKER_USER_PASS")
