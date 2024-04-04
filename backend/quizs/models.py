from django.db import models
from users.models import User

class Quiz(models.Model):
    content = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    orderNum = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)