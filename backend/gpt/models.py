from django.db import models
from quizlevels.models import QuizLevel

class GptElementary(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, default="초등학생")

class GptMiddle(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, default="중학생")

class GptHigh(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, default="고등학생")

class GptNative(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, default="원어민")

class GptToeic(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, default="토익")
