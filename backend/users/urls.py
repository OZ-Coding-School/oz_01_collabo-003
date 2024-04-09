from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("register/", views.RegisterAPIView.as_view()), #회원가입하기
    path("login/", views.LoginAPIView.as_view()), #로그인하기
    path('auth/refresh/', views.RefreshTokenView.as_view()),#토큰 재발급하기
    path("logout/", views.LogoutAPIvie.as_view()), #로그아웃하기
    path("myinfo/", views.MyInfo.as_view()), #유저 정보 업데이트
    path("<int:user_id>", views.GetUserDataAPIView.as_view()), #특정 유저 질문, 답변, 피드백, 점수 가져오기
    path("passwordReset/", views.PasswordResetAPIView.as_view()), #비밀번호 재설정
    path('password-reset/confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]