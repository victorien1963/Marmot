from abc import ABCMeta, abstractmethod
from task_base.task_worker_dispatcher_base import TaskWorkerDispatcherBase


class DispatcherInitializerBase(metaclass=ABCMeta):
    @abstractmethod
    def execute(self) -> TaskWorkerDispatcherBase:
        pass
