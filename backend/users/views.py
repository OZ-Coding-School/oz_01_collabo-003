# from django.shortcuts import render
from rest_framework.views import APIView, Response, status
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import authenticate, logout
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import User
from quizs.models import Quiz
from feedbacks.models import Feedback
from .serializers import UserSerializer
from quizs.serializers import QuizSerializer
from feedbacks.serializers import FeedbackSerializer



# 회원가입 기능
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그인 기능
class LoginAPIView(APIView):
    def post(self, request):
        user = authenticate(
            userId = request.data.get('userId'),
            password = request.data.get('password')
        )
        if user is not None:
            accessToken = TokenObtainPairSerializer().get_token(user)
            refreshToken = RefreshToken.for_user(user)
            res = Response(
                {
                    "message": "login success",
                    "accessToken": str(accessToken),
                    "refreshToken": str(refreshToken),
                },
                status=status.HTTP_200_OK,
            )
            return res
        else:
            return Response(
                {
                    "message": "login failed",
                },
                status=status.HTTP_400_BAD_REQUEST,
                )

# 로그아웃 기능  
class LogoutAPIvie(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(
            {
                "message": "logout success",
            },
            status=status.HTTP_200_OK,
        )

# 유저 정보 업데이트
class MyInfo(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# refresh 토큰 재발급 커스텀 유효성 실패시 다시 발급 
class refreshToken(TokenRefreshView):
    def post(self, request):
        try:
            refreshToken = request.COOKIES.get("refreshToken")
            token = RefreshToken(refreshToken)
            accessToken = token.access_token
            
            res = Response(
                {
                    "accessToken": str(accessToken),
                },
                status=status.HTTP_200_OK,
            )
            return res
            
        except Exception:
            return Response(
                {
                    "message": "Invalid refresh token",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        
class GetUserDataAPIView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # 해당 유저의 퀴즈와 피드백을 가져옴
        quizzes = Quiz.objects.filter(user=user).order_by('orderNum')[:5]
        feedbacks = Feedback.objects.filter(quiz__user=user).order_by('-createdAt')[:5]

        user_serializer = UserSerializer(user)
        quiz_serializer = QuizSerializer(quizzes, many=True)
        feedback_serializer = FeedbackSerializer(feedbacks, many=True)

        # 퀴즈와 피드백을 합친 데이터 생성
        combined_data = []
        for quiz, feedback in zip(quiz_serializer.data, feedback_serializer.data):
            combined_data.append({
                "content": quiz["content"],
                "answer": quiz["answer"],
                "feedback": feedback["content"],
                "score": feedback["score"],
                "createdAt": feedback["createdAt"]
            })

        data = {
            "user": user_serializer.data,
            "quizzes": combined_data,
        }

        return Response(data,status=status.HTTP_200_OK,)