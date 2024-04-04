from django.db import models
from quizlevels.models import QuizLevel

class Quiz(models.Model):
    content = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    orderNum = models.IntegerField()
    quizLevel = models.ForeignKey(QuizLevel, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)