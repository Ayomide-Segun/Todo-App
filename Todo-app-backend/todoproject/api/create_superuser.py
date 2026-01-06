import os
from django.contrib.auth import get_user_model

User = get_user_model()

def run():
    username = os.getenv("DJANGO_SUPERUSER_USERNAME")
    password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

    if not username or not password:
        return

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            password=password
        )
        print("Superuser created")
    else:
        print("Superuser already exists")
