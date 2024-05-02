from abc import ABCMeta, abstractmethod
from concurrent.futures import ProcessPoolExecutor


class TaskWorkerDispatcherBase(metaclass=ABCMeta):
    @abstractmethod
    def dispatch(self, executor: ProcessPoolExecutor):
        pass
