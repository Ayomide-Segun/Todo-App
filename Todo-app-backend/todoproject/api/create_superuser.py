import os
from django.contrib.auth import get_user_model


def run():
    User = get_user_model()
    username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

    if not username or not password:
        print("superuser env var missing")
        return

    user, created = User.objects.get_or_create(
        username=username
    )

    # 🔥 FORCE password reset every deploy
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.save()

    print("Superuser ensured:", username)
    
