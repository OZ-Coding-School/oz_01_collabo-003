from django.urls import path
from . import views
urlpatterns = [
    path("",views.QuizLevelAPIView.as_view()),
]