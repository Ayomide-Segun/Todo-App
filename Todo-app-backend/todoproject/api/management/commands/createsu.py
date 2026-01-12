import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import connection

class Command(BaseCommand):
    help = "Create or update a superuser from env vars"

    def handle(self, *args, **kwargs):
        if "auth_user" not in connection.introspection.table_names():
            print("Auth table not ready, skipping superuser creation")
            return
        
        User = get_user_model()

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            self.stdout.write("❌ Superuser env vars missing")
            return

        user, created = User.objects.get_or_create(username=username)

        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        if created:
            self.stdout.write(f"✅ Superuser created: {username}")
        else:
            self.stdout.write(f"🔁 Superuser updated: {username}")
