from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuiztrySerializer
from quizs.models import QuizTry

class QuizAPIView(APIView):
    def post(self, request, format=None):
        user = request.user
        
        # 클라이언트로부터 받은 데이터에 사용자 정보를 추가하여 serializer에 전달
        data = request.data
        data['user'] = user.id
        
        # Serializer를 사용하여 데이터 유효성 검사 후 저장
        serializer = QuiztrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        quiz_try_id = request.data.get('quiz_try_id')
        quiz_try_instance = get_object_or_404(QuizTry, id=quiz_try_id)
        quiz_try_instance.delete()
        return Response({"message": "삭제되었습니다."}, status=status.HTTP_200_OK)