from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegisterAPIView.as_view()), #회원가입하기
    path("login/", views.LoginAPIView.as_view()), #로그인하기
    path('auth/refresh/', views.refreshToken.as_view()),#토큰 재발급하기
    path("logout/", views.LogoutAPIvie.as_view()), #로그아웃하기
    path("myinfo/", views.MyInfo.as_view()), #유저 정보 업���이트
]