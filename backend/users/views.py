# from django.shortcuts import render
from rest_framework.views import APIView, Response, status
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.contrib.auth import authenticate, logout
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.views import TokenRefreshView

def setRefreshTokenCookie(response, refreshToken):
    response.set_cookie('refreshToken', str(refreshToken), max_age=86400, secure=False, samesite=None, httponly=False, domain="localhost")
    return response

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
            serializer = LoginSerializer(user)
            accessToken = TokenObtainPairSerializer().get_token(user)
            refreshToken = RefreshToken.for_user(user)
            res = Response(
                {
                    "message": "login success",
                    "accessToken": str(accessToken),
                },
                status=status.HTTP_200_OK,
            )
            # 임시 쿠키에 accessToken, refresh token 저장
            # res.set_cookie('accessToken', str(access_token) , expires=datetime.now()+timedelta(days=1), secure=True, samesite='None') # 서버에서 httpsonly=True
            setRefreshTokenCookie(res, refreshToken)
            # res.set_cookie('refreshToken', str(refresh_token), max_age=86400, secure=False, samesite=None, httponly=False, domain="localhost") 
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
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response(
            {
                "message": "logout success",
            },
            status=status.HTTP_200_OK,
        )

# 유저 정보 업데이트
class MyInfo(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

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
            setRefreshTokenCookie(res,refreshToken)
            return res
            
        except Exception:
            return Response(
                {
                    "message": "Invalid refresh token",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        

class modify(TokenModifyView):
    def post(self, request):
        pass