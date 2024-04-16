from django.urls import path
from . import views

urlpatterns = [
    path('elementary/', views.generate_english_elementary_quiz),
    path('high/', views.generate_english_high_quiz),
]