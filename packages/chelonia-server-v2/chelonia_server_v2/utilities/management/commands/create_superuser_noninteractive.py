from django.core.management.base import BaseCommand
from chelonia_account.models import User, UserType


class Command(BaseCommand):
    user_type = UserType.ADMIN

    def handle(self, *args, **options):
        username = options["username"]
        passwd = options["passwd"]

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, password=passwd, user_type=self.user_type)
        else:
            self.stdout.write(self.style.SUCCESS(f"User {username} already exists, not created)"))

        self.stdout.write(self.style.SUCCESS(f"User {username} creation finished"))

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, default="test")
        parser.add_argument('--passwd', type=str, default="test")
