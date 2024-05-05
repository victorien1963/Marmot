import os

# Connection information
FAILED_HTTP_RETRY_TIMES = int(os.environ.get("FAILED_HTTP_RETRY_TIMES", 5))

API_SERVER_URL = os.environ.get("API_SERVER_URL")
WORKER_API_PREFIX = os.environ.get("WORKER_API_PREFIX", "worker")
LOGIN_URL = f"{API_SERVER_URL}/auth/login"
WORKER_CLIP_EXPORTING_TASK_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/clip/clip-exporting-task/"
WORKER_EXPORTED_CLIP_MANAGEMENT_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/clip/exported-clip/"
WORKER_SUBTITLE_GENERATION_TASK_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/subtitle/subtitle-generation-task/"
WORKER_SUBTITLE_MANAGEMENT_URL = f"{API_SERVER_URL}/{WORKER_API_PREFIX}/subtitle/management/"

# Object store configs
# Default is S3
CUSTOM_OBJECT_STORE_TYPE = os.environ.get("CUSTOM_OBJECT_STORE_TYPE", "S3")
# Use custom endpoint or not
CUSTOM_OBJECT_STORE_ENDPOINT = os.environ.get("CUSTOM_OBJECT_STORE_ENDPOINT", None)
# Bucket serves as root
OBJECT_STORE_BUCKET = os.environ.get("OBJECT_STORE_BUCKET")
# Bucket mount path
OBJECT_STORE_BUCKET_MOUNT_ROOT = os.environ.get("OBJECT_STORE_BUCKET_MOUNT_ROOT")

# Execution worker number
# https://docs.python.org/zh-tw/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor
MAX_WORKERS = int(os.environ.get("MAX_WORKERS", 0)) if int(os.environ.get("MAX_WORKERS", 0)) > 0 else None
# Task scan interval, s
TASK_SCAN_INTERVAL = int(os.environ.get("TASK_SCAN_INTERVAL",10))
# Task dispatch interval, s
TASK_DISPATCH_INTERVAL = float(os.environ.get("TASK_DISPATCH_INTERVAL", 1))

# OpenAI setting
OPENAI_KEY = os.environ.get("OPENAI_KEY")
