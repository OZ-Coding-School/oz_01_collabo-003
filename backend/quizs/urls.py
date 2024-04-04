from django.urls import path
from .  import views
urlpatterns = [
    path('',views.QuizView.as_view())
]