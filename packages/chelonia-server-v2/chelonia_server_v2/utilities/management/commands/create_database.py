from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import time


class Command(BaseCommand):
    def handle(self, *args, **options):
        db_connection = self.__try_create_db_connection(options["retry_times"])
        db_connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        self.__try_create_database_if_not_exist(db_connection)
        db_connection.close()

        self.stdout.write(self.style.SUCCESS(f"Database initialization finished"))

    def __try_create_db_connection(self, retry_times_limit):
        current_retry_time = 0
        successfully_created = False
        db_connection = None

        while current_retry_time < retry_times_limit and successfully_created is False:
            try:
                db_connection = self.__create_db_connection()
                successfully_created = True
            except Exception as e:
                self.stdout.write(
                    self.style.WARNING(
                        f'Failed to connect. Error: {e}. Retry times: {current_retry_time}. Retry after 1s'
                    )
                )
            finally:
                current_retry_time += 1
                time.sleep(1)

        if db_connection is None:
            raise CommandError('Unable to establish connection with database after retry limit')

        self.stdout.write(self.style.SUCCESS(f"Database connection established"))

        return db_connection

    def __create_db_connection(self):
        db_host = settings.DATABASES['default']['HOST']
        db_port = int(settings.DATABASES['default']['PORT'])
        db_user = settings.DATABASES['default']['USER']
        db_pass = settings.DATABASES['default']['PASSWORD']

        db_connection = connect(host=db_host, port=db_port, user=db_user, password=db_pass, dbname='postgres')
        db_connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

        return db_connection

    def __try_create_database_if_not_exist(self, db_connection):
        db_name = settings.DATABASES['default']['NAME']

        try:
            cursor = db_connection.cursor()

            cursor.execute(f"""SELECT datname FROM pg_database;""")
            result = cursor.fetchall()
            self.stdout.write(f"Database list - {result}")

            if (db_name,) not in result:
                self.stdout.write(self.style.SUCCESS(f"Database {db_name} not exist, create it"))
                cursor.execute(f"CREATE DATABASE {db_name}")

        except Exception as e:
            raise CommandError(f'Unable to perform SQL command. Error: {e}')

        self.stdout.write(self.style.SUCCESS(f"Database created"))

        cursor.close()

    def add_arguments(self, parser):
        parser.add_argument('--retry-times', type=int, default=60)
