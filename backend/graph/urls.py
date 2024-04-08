from django.urls import path
from .  import views
urlpatterns = [
    path('Month/',views.MonthlyAverageScores.as_view()),
    path('Week/',views.WeeklyAverageScores.as_view()),
    path('Day/',views.DailyAverageScores.as_view()),
]