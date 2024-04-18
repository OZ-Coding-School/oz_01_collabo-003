from django.urls import path
from . import views

urlpatterns = [
    path('', views.OpenAiAPIView.as_view()),
    path('quiz/', views.GptQuizAPIView.as_view()),
    path('feedback/<int:quiz_try_id>/',views.FeedbackView.as_view()),
]