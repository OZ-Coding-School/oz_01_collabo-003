from django.urls import path
from . import views

urlpatterns = [
    # path('elementary/', views.generate_english_elementary_quiz),
    # path('high/', views.generate_english_high_quiz),
    # path('middle/', views.generate_english_middle_quiz),
    # path('native/', views.generate_english_native_quiz),
    # path('toeic/', views.generate_english_toeic_quiz),
    path('elementary/', views.GptElementaryAPIView.as_view()),
    path('high/', views.GptHighAPIView.as_view()),
    path('middle/', views.GptMiddelAPIView.as_view()),
    path('native/', views.GptNativeAPIView.as_view()),
    path('toeic/', views.GptToeciAPIView.as_view()),
    path('feedback/', views.feedback)
]