from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        username = options["username"]
        passwd = options["passwd"]
        email = options["email"]

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=passwd)
        else:
            self.stdout.write(self.style.SUCCESS(f"User {username} already exists , not created)"))

        self.stdout.write(self.style.SUCCESS(f"User {username} creation finished"))

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, default="test")
        parser.add_argument('--passwd', type=str, default="test")
        parser.add_argument('--email', type=str, default="test@test.com")
