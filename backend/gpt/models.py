from django.db import models


class GptQuestionAnswer(models.Model):
    LEVEL_CHOICES = (
        ("초등학생","초등학생"),
        ("중학생","중학생"),
        ("고등학생","고등학생"),
        ("원어민","원어민"),
        ("토플","토플"),
    )
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    level = models.CharField(max_length=30, choices=LEVEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

