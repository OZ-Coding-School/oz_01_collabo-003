from .base import *

DEBUG = False
ALLOWED_HOSTS = ['도메인서버']

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.mysql"
    }
}