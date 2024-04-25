from django.db import models
from users.models import User
from gpt.models import GptQuestionAnswer

class QuizTry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    quizLevel = models.CharField(max_length=255)


class Quiz(models.Model):
    quiz_try = models.ForeignKey(QuizTry, on_delete=models.CASCADE)
    question = models.ForeignKey(GptQuestionAnswer, on_delete=models.PROTECT)
    answer = models.CharField(max_length=255)
    gptanswer = models.CharField(max_length=255)
    orderNum = models.IntegerField(db_column="order_num")
    feedback = models.TextField(max_length=255, null=True)
    score = models.IntegerField(null=True)

