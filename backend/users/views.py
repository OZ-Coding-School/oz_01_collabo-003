from rest_framework.views import APIView, Response, status
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from quizs.models import Quiz,QuizTry
from .serializers import UserSerializer,myinfoSerializer
from quizs.serializers import QuizSerializer
from rest_framework.permissions import AllowAny
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from quizs.serializers import QuizTrySerializer
from gpt.models import GptQuestionAnswer
from django.utils import timezone
from django.db.models import Sum
from datetime import datetime, timedelta
from django.contrib.auth.views import PasswordResetConfirmView
from django.contrib.auth.forms import SetPasswordForm


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
    

# 이메일 유효성 검사
class EmailValidAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"message": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "이메일이 정상입니다."}, status=status.HTTP_200_OK)


# 닉네임 유효성 검사
class NickNameValidAPIView(APIView):
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
        # 로그인 요청에서 전달된 사용자 정보
        email = request.data.get('email')
        # 사용자 인증을 위한 추가적인 검증 (예: 비활성화된 사용자인지 확인)
        user = User.objects.filter(email=email).first()
        if user and user.deletedAt is not None:
            # 사용자가 비활성화되어 있으면 로그인을 차단
            return Response({"message": "비활성화된 사용자입니다."}, status=status.HTTP_409_CONFLICT)

        # 부모 클래스(TokenObtainPairView)의 post 메서드 호출하여 로그인 처리
        res = super().post(request)
        # 응답에서 액세스 토큰과 리프레시 토큰 가져오기
        refreshToken = res.data['refresh']
        accessToken = res.data['access']

        # 로그인 성공 응답 생성
        login_response = {
            "message": "로그인 성공",
            "access_token": accessToken,
            "refresh_token": refreshToken,
        }
        return Response(login_response, status=status.HTTP_200_OK)


# 로그아웃 기능  
class LogoutAPIvie(APIView):
    def post(self, request):
        return Response(
            {
                "message": "로그아웃 성공",
            },
            status=status.HTTP_200_OK,
        )


# 유저 정보 업데이트/가져오기
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
        else:
            if 'nickname' in serializer.errors:
                return Response({'error': 'Nickname already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# refresh 토큰 재발급 커스텀 유효성 실패시 다시 발급 
class RefreshTokenView(APIView):
    def post(self, request, *args, **kwargs):
        # 클라이언트로부터 refresh 토큰을 받습니다.
        refresh_token = request.data.get('refresh')
        print(refresh_token)
        # refresh 토큰이 제공되지 않은 경우
        if not refresh_token:
            return Response({"message": "Refresh token이 없습니다"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # refresh 토큰을 검증하여 유효성을 확인합니다.
            token = RefreshToken(refresh_token)
            
            # 새로운 액세스 토큰 발급
            access_token = token.access_token
            
            # 새로운 액세스 토큰과 리프레시 토큰을 클라이언트에게 반환합니다.
            return Response({
                'access': str(access_token),
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            # refresh 토큰이 유효하지 않은 경우
            return Response({"message": f"유효하지 않는 토큰입니다{e}"}, status=status.HTTP_400_BAD_REQUEST)


# 특정유저의 퀴즈 데이터 가져오기
class GetUserDataAPIView(APIView):
    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({"message": "유저가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        # 해당 유저의 모든 퀴즈 시도 가져오기
        quiz_tries = QuizTry.objects.filter(user=user)
        
        user_serializer = UserSerializer(user)
        quiz_try_serializer = QuizTrySerializer(quiz_tries, many=True)
        
        # 퀴즈 시도마다 5개의 문제 가져오기
        quiz_data = []
        for quiz_try_data in quiz_try_serializer.data:
            quiz_try_id = quiz_try_data['id']
            quizzes = Quiz.objects.filter(quiz_try=quiz_try_id)  # 각 퀴즈 시도에서 문제 다 가져오기
            # quizzes = Quiz.objects.filter(quiz_try=quiz_try_id[0:5] # 각 퀴즈 시도에 대해 최대 5개의 문제 가져오기
            
            quiz_serializer = QuizSerializer(quizzes, many=True)
            
            # 퀴즈의 질문을 문제 내용으로 바꾸기
            modified_quizzes = []
            for quiz in quiz_serializer.data:
                question_instance = GptQuestionAnswer.objects.get(id=quiz['question'])  # 질문 객체 가져오기
                quiz['question'] = question_instance.question  # 질문 내용으로 변경
                modified_quizzes.append(quiz)
            
            quiz_data.append({
                'quiz_try': quiz_try_data,
                'quizzes': modified_quizzes
            })

        data = {
            "user": user_serializer.data,
            "quiz_data": quiz_data,
        }

        return Response(data, status=status.HTTP_200_OK)


# 비밀번호 초기화
class PasswordResetAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get('email')
        if email:
            # 이메일 주소에 해당하는 사용자 찾기
            try:
                user = User.objects.get(email=email)
                if user.deletedAt is not None:
                    return Response({"error:": "비활성화 된 이메일 입니다"}, status=status.HTTP_400_BAD_REQUEST)
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


# 비밀번호 초기화 폼 비밀번호 유효성 검사 기능
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    form_class = SetPasswordForm

    def form_valid(self, form):
        # 기존의 form_valid() 메서드 실행
        response = super().form_valid(form)
        
        # 비밀번호 유효성 검사 수행
        password = form.cleaned_data['new_password1']
        if not any(char.isdigit() for char in password) or not any(char.isalpha() for char in password) or not any(not char.isalnum() for char in password):
            # 특수문자가 포함되지 않은 경우
            form.add_error('new_password1', '비밀번호에는 특수문자를 포함해야 합니다.')
            return self.form_invalid(form)
        
        return response
        

# 회원 탈퇴시 계정 비활성화
class DeactivateUserAPIView(APIView):
    # 계정 비활성화 함수
    def deactivate_user(self,user):
        user.deletedAt = timezone.now()
        user.save()
        
    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({"message": "해당 사용자가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        # 사용자를 비활성화 처리
        self.deactivate_user(user)
        
        return Response({"message": "사용자가 성공적으로 비활성화되었습니다."}, status=status.HTTP_200_OK)


# 유저 요일별 총 점수 가져오기
class GetUserAllScore(APIView):
    def get(self, request, levelName):
        try:
            user = User.objects.get(id=request.user.id)
        except User.DoesNotExist:
            return Response({"message": "유저가 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        # 현재 날짜 가져오기
        current_date = datetime.now()

        # 이번 주의 시작 날짜 계산
        start_of_week = current_date - timedelta(days=current_date.weekday())

        # 이번 주의 각 요일에 대한 점수 합과 퀴즈 트라이 개수 구하기
        scores_and_quiz_tries_by_day = []
        for i in range(7):
            # 해당 요일의 날짜 계산
            date_of_day = start_of_week + timedelta(days=i)
            
            # level에 따라 다른 데이터 가져오기
            quizzes_of_day = self.level_filter(levelName,user,date_of_day)
            
            # 해당 요일에 푼 문제들 가져오기
            quizzes_of_day = quizzes_of_day
            
            # 해당 요일에 푼 문제들의 점수 합 구하기
            total_score_of_day = quizzes_of_day.aggregate(total_score=Sum('score'))['total_score'] or 0
            # 해당 요일에 생성된 퀴즈 트라이 개수 구하기
            quiz_tries_of_day_count = QuizTry.objects.filter(user=user, createdAt__date=date_of_day).count()
            
            # 점수 합과 퀴즈 트라이 개수를 scores_and_quiz_tries_by_day 리스트에 추가
            scores_and_quiz_tries_by_day.append({
                "day": date_of_day.strftime("%A"),  # 요일 문자열로 변환하여 추가
                "day_": date_of_day.strftime("%m/%d"),
                "total_score": total_score_of_day,
                "quiz_try_count": quiz_tries_of_day_count,
                "quizzes": QuizSerializer(quizzes_of_day, many=True).data  # 해당 요일에 푼 퀴즈들도 추가
            })

        # 결과 데이터 구성
        data = {
            "user": UserSerializer(user).data,
            "scores_and_quiz_tries_by_day": scores_and_quiz_tries_by_day
        }

        return Response(data, status=status.HTTP_200_OK)

    def level_filter(self, levelName, user, date_of_day):
            if levelName == '초등학생':
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day, quiz_try__quizLevel='초등학생')  
            elif levelName == '중학생':
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day, quiz_try__quizLevel='중학생')  
            elif levelName == '고등학생':
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day, quiz_try__quizLevel='고등학생')  
            elif levelName == '원어민':
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day, quiz_try__quizLevel='원어민')  
            elif levelName == '토플':
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day, quiz_try__quizLevel='토플')  
            else:
                quizzes_of_day = Quiz.objects.filter(quiz_try__user=user, quiz_try__createdAt__date=date_of_day)
            
            return quizzes_of_day