from django.db import models
from django.contrib.auth.models import User

class Todos(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,  null=True, blank=True)
    task_group = models.CharField()
    project_name = models.CharField(max_length=500)
    start_date = models.DateField()
    end_date = models.DateField()
    intensity = models.CharField()
    status = models.CharField()
    entry_date_time = models.CharField()
    ai_use = models.BooleanField(default=False)
    project_id = models.CharField(
        max_length=255,
        default="default"
    )    
    def __str__(self):
        return f"{self.task_group} [{self.project_name}] - {self.status}" 

class CheckIns(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,  null=True, blank=True)
    date = models.IntegerField()
    todo = models.IntegerField()
    
class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,  null=True, blank=True)
    user_prompt = models.CharField()
    ai_response = models.CharField()
    time_stamp = models.DateTimeField(auto_now_add=True)
    project_id = models.CharField(
        max_length=255,
        default="default"
    )
    
    def __str__(self):
        return f"{self.time_stamp} - {self.user_prompt[:30]}"