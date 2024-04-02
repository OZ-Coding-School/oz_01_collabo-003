from django.db import models
from django.conf import settings
import openai
# Create your models here.

openai.api_key = settings.OPENAI_API_KEY