from django.db import models
from users.models import User

class QuizLevel(models.Model):
  createdAt = models.DateTimeField(auto_now_add=True)  
  level = models.CharField(max_length=30) 
  user = models.ForeignKey(User, on_delete=models.CASCADE) 