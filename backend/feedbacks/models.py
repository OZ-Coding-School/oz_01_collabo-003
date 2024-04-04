from django.db import models
from quizs.models import Quiz
class Feedback(models.Model):
    content = models.TextField(max_length=255)
    score = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

