from rest_framework.views import APIView, Response, status
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .models import User
from quizs.models import Quiz
from feedbacks.models import Feedback
from .serializers import UserSerializer,myinfoSerializer
from quizs.serializers import QuizSerializer
from feedbacks.serializers import FeedbackSerializer
from rest_framework.permissions import AllowAny
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse

# 회원가입 기능
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class emailValid(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"message": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "이메일이 정상입니다."}, status=status.HTTP_200_OK)
class nickNameValid(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        nickName = request.data.get('nickName')
        if User.objects.filter(nickName=nickName).exists():
            return Response({"message": "이미 존재하는 닉네임입니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "닉네임이 정상입니다."}, status=status.HTTP_200_OK)

# 로그인 기능
class LoginAPIView(TokenObtainPairView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        res = super().post(request)
        print(res.data)
        refreshToken = res.data['refresh']
        accessToken = res.data['access']
        res = Response(
                {
                    "message": "로그인 성공",
                    "accessToken": str(accessToken),
                    "refreshToken": str(refreshToken),
                   
                },
                status=status.HTTP_200_OK,
            )
        return res

# 로그아웃 기능  
class LogoutAPIvie(APIView):
    def post(self, request):
            # 토큰을 따로 DB에 저장을 안 하기 때문에 블랙리스트방식을 못 써서 클라이언트측에서 토큰을 삭제하는 방식으로 해야함
        return Response(
            {
                "message": "로그아웃 성공",
            },
            status=status.HTTP_200_OK,
        )

# 유저 정보 업데이트
class MyInfo(APIView):
    def get(self, request):
        user = User.objects.get(id=request.user.id)   
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        serializer = myinfoSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# refresh 토큰 재발급 커스텀 유효성 실패시 다시 발급 
class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # 클라이언트로부터 refresh 토큰을 받습니다.
        refresh_token = request.data.get('refresh')
        
        # refresh 토큰이 제공되지 않은 경우
        if not refresh_token:
            return Response({"message": "Refresh token이 없습니다"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # refresh 토큰을 검증하여 유효성을 확인합니다.
            token = RefreshToken(refresh_token)
            token_payload = token.payload
            
            # 새로운 액세스 토큰 발급
            access_token = token.access_token
            
            # 새로운 리프레시 토큰 발급
            new_refresh_token = RefreshToken.for_user(token_payload['user'])
            
            # 새로운 액세스 토큰과 리프레시 토큰을 클라이언트에게 반환합니다.
            return Response({
                'access': str(access_token),
                'refresh': str(new_refresh_token),
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            # refresh 토큰이 유효하지 않은 경우
            return Response({"message": "유효하지 않는 토큰입니다"}, status=status.HTTP_400_BAD_REQUEST)
        
class GetUserDataAPIView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": "유저가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
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

# 비밀번호 찾기 (초기화)
class PasswordResetAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        email = request.data.get('email')
        if email:
            # 이메일 주소에 해당하는 사용자 찾기
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "해당 이메일 주소를 가진 사용자를 찾을 수 없습니다."}, status=status.HTTP_400_BAD_REQUEST)
            
            # 비밀번호 재설정 토큰 생성
            token = default_token_generator.make_token(user)
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            
            # 비밀번호 재설정 이메일 보내기
            reset_link = reverse('password_reset_confirm', kwargs={'uidb64': uidb64, 'token': token})
            reset_url = request.build_absolute_uri(reset_link)
            message = f"비밀번호를 재설정하려면 다음 링크를 클릭하세요: {reset_url}"
            send_mail(
                "비밀번호 재설정",
                message,
                None,
                [email],
                fail_silently=False,
            )
            return Response({"message": "비밀번호 재설정 이메일을 보냈습니다."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "이메일 주소를 제출해야 합니다."}, status=status.HTTP_400_BAD_REQUEST)