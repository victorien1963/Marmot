import os

WHISPER_API_SERVER_URL = os.environ.get("WHISPER_API_SERVER_URL",'https://whisper-api-worker')

# The Whisper API Worker expects bucket mounted to filesystem through s3fs
BUCKET_NAME = os.environ.get("BUCKET_NAME")
BUCKET_MOUNT_ROOT = os.environ.get("BUCKET_MOUNT_ROOT")

# statically loaded from filesystem
WHISPER_MODEL_PATH = os.environ.get("WHISPER_MODEL_PATH", "large-v2")

# Should be "cuda" or "cpu"
DEVICE_TYPE = os.environ.get("DEVICE_TYPE", "cpu")

# # Initial prompt
INITIAL_PROMPT = "Hello, Let's begin to talk."

# End of sentence symbol
END_OF_SENTENCE = [['.', '?', '。', '？', '!', '！']]

# Execution
MAX_WORKERS = 5
# Task scan interval, s
TASK_SCAN_INTERVAL = 60

# boot time connection checking
BOOT_RETRY_TIMES = int(os.environ.get("BOOT_RETRY_TIMES",60))
# unit: second
BOOT_RETRY_WAIT = int(os.environ.get("BOOT_RETRY_WAIT",1))
