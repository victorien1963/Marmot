import logging
import sys


class Singleton(type):
    def __init__(self, *args, **kwargs):
        self.__instance = None
        super().__init__(*args, **kwargs)

    def __call__(self, *args, **kwargs):
        if self.__instance is None:
            self.__instance = super().__call__(*args, **kwargs)

        return self.__instance


class DefaultLogger(logging.Logger, metaclass=Singleton):
    def __init__(self):
        super().__init__(self.__class__.__name__)


class DefaultLoggerConfigurator:
    @staticmethod
    def execute():
        logger = DefaultLogger()
        logger.setLevel(logging.DEBUG)

        stream_handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(fmt='%(asctime)s - %(levelname)s - %(module)s - %(funcName)s - %(lineno)d - %(process)d - %(thread)d- %(message)s', datefmt="[%Y-%m-%d %H:%M:%S]")
        stream_handler.setFormatter(formatter)

        logger.addHandler(stream_handler)
