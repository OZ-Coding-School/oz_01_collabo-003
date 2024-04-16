from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuizLevelSerializer

class QuizLevelAPIView(APIView):
    def post(self, request, format=None):
        user = request.user
        serializer = QuizLevelSerializer(user=user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)