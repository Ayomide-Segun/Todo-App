from django.contrib import admin
from .models import Todos, CheckIns, ChatMessage

# Register your models here.
admin.site.register(Todos)
admin.site.register(CheckIns)
admin.site.register(ChatMessage)