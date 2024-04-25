from .base import *

DEBUG = True
ALLOWED_HOSTS = ['https://3eng.store/','3eng.store']

DATABASES = {
    'default': {
        'ENGINE': SECRET["db"]["ENGINE"],
        'NAME': SECRET["db"]["NAME"],
        'USER': SECRET["db"]["USER"],
        'PASSWORD': SECRET["db"]["PASSWORD"],
        'HOST': SECRET["db"]["HOST"],
        'PORT': SECRET["db"]["PORT"],
    }
}