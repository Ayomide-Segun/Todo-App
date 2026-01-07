from django.apps import AppConfig
import os

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from django.contrib.auth import get_user_model

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            return

        User = get_user_model()

        user, created = User.objects.get_or_create(
            username=username
        )

        # 🔥 force reset password every deploy
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        print("✅ Superuser ready:", username)
