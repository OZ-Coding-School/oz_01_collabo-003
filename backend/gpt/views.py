from random import sample
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
# from django.views.decorators.csrf import csrf_exempt
from .manager import GptManager
from .models import GptQuestionAnswer
from quizs.models import Quiz, QuizTry
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import GptQuestionAnswerSerializer
from quizs.serializers import QuizSerializer,QuiztrySerializer,QuizAllSerializer
import json


class OpenAiAPIView(APIView):
    def post(self, request):
        # levels = ["초등학생","중학생","고등학생","원어민","토플"]
        levels = ["초등학생"]
        for level in levels:
            # 각 level에 대해 퀴즈 생성
            order_num = 1  # 퀴즈의 생성 순서를 나타내는 변수
            for _ in range(4):
                questions = GptManager.generate_question_openai(level)
                questions = json.loads(questions)
                for question in questions["questions"]:
                    # 중복 확인
                    if not GptQuestionAnswer.objects.filter(question=question['question']).exists():
                        # 중복되지 않은 경우 퀴즈 저장
                        GptQuestionAnswer.objects.create(question=question['question'], category=question['type'], answer=question["answer"], level=level)
                        
        
        return JsonResponse({"message": "English quizzes generated successfully!"})


class GptQuizAPIView(ListAPIView):
    serializer_class = QuizAllSerializer
    
    def get_queryset(self):
        # 특정 유저가 푼 퀴즈의 question_id 리스트 가져오기
        user = self.request.user
        user_quiz_questions = Quiz.objects.filter(quiz_try__user=user).values_list('question_id', flat=True)
        
        # 중복되지 않는 퀴즈를 최대 5개까지 가져오기
        random_questions = GptQuestionAnswer.objects.exclude(id__in=user_quiz_questions).order_by('?')[:5]
        return random_questions

    

from rest_framework.views import APIView
from rest_framework import status
from quizs.serializers import QuizSerializer
from rest_framework.response import Response

class FeedbackView(APIView):
    def post(self, request, quiz_try_id, format=None):
        # 클라이언트로부터 전송된 데이터
        data_list = request.data
        response_data_list = []  # 모든 데이터의 응답을 저장할 리스트
        
        try:
            # 각 데이터를 순회하며 처리
            for data in data_list:
                # GptManager를 사용하여 피드백과 점수를 생성합니다.
                feedback_str = GptManager.generate_feedback(data["question"], data["answer"])
                feedback = json.loads(feedback_str)
                
                # 피드백을 데이터베이스에 저장합니다.
                # 여기서 quiz_try는 특정 유저의 quiz_try 인스턴스를 가져와야합니다.
                # quiz_try_id에 해당하는 인스턴스를 가져오거나 새로 생성합니다.
                quiz_try_instance = get_object_or_404(QuizTry, id=quiz_try_id)
                
                # 주어진 질문과 일치하는 GptQuestionAnswer 인스턴스를 가져옵니다.
                question_instance = get_object_or_404(GptQuestionAnswer, question=data["question"])
                
                quiz_instance = Quiz.objects.create(
                    question=question_instance,
                    answer=data["answer"],
                    quiz_try=quiz_try_instance,
                    orderNum=data["orderNum"],
                    feedback=feedback["feedback"],
                    score=feedback["score"]
                )
                
                # 저장된 피드백의 정보를 응답 데이터에 추가합니다.
                response_data = {
                    "id": quiz_instance.id,
                    "question": quiz_instance.question.question,
                    "answer": quiz_instance.answer,
                    "quiz_try": quiz_instance.quiz_try.id,
                    "orderNum": quiz_instance.orderNum,
                    "feedback": feedback["feedback"],
                    "score": feedback["score"],
                    "createdAt": quiz_try_instance.createdAt,
                }
                response_data_list.append(response_data)  # 응답 데이터를 리스트에 추가
            
            return Response(response_data_list, status=status.HTTP_201_CREATED)  # 모든 응답을 한 번에 보냄
        except Exception as e:
            # 예외가 발생할 경우 에러 메시지를 응답으로 보냅니다.
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, quiz_try_id, *args, **kwargs):
        # 특정 유저의 quiz_try를 받아서 get 요청
        quiz_try_instance = get_object_or_404(QuizTry, id=quiz_try_id)
        # 해당 quiz_try에 속하는 퀴즈들을 가져옵니다.
        quizzes = Quiz.objects.filter(quiz_try=quiz_try_instance)
        
        # 퀴즈 데이터를 직렬화합니다.
        serializer = QuizSerializer(quizzes, many=True)
        
        # 직렬화된 데이터를 클라이언트에게 반환합니다.
        return Response(serializer.data,status=200)