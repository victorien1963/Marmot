from .create_superuser_noninteractive import Command as SuperUserCreationCommand
from chelonia_account.models import UserType


class Command(SuperUserCreationCommand):
    user_type = UserType.WORKER
