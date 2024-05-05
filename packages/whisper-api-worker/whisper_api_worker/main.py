from logger import DefaultLoggerConfigurator
from whisper_api_worker import TaskWatcher
from whisper_api_server_client import WhisperAPIServerClient
from whisper_api_server_client import ConnectionChecker
import settings


if __name__ == '__main__':
    DefaultLoggerConfigurator().execute()
    ConnectionChecker(url=settings.WHISPER_API_SERVER_URL, retry_times=settings.BOOT_RETRY_TIMES, retry_wait=settings.BOOT_RETRY_WAIT).execute()
    TaskWatcher(WhisperAPIServerClient(settings.WHISPER_API_SERVER_URL)).execute()
