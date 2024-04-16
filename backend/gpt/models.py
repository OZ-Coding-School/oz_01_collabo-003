from django.db import models


class GptElementary(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class GptMiddle(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class GptHigh(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class GptNative(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class GptToeic(models.Model):
    question = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
