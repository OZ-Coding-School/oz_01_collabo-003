from django.shortcuts import get_object_or_404
from .manager import GptManager
from .models import GptQuestionAnswer
from quizs.models import Quiz, QuizTry
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import GptQuestionAnswerDetailSerializer
from quizs.serializers import QuizSerializer
from rest_framework import status
from rest_framework.response import Response
import json


class GptQuizAPIView(ListAPIView):
    serializer_class = GptQuestionAnswerDetailSerializer
    
    def get_queryset(self):
        level = self.kwargs.get('levelName')
        user = self.request.user
        user_quiz_questions = Quiz.objects.filter(quiz_try__user=user).values_list('question_id', flat=True)
        random_questions = GptQuestionAnswer.objects.filter(level=level).exclude(id__in=user_quiz_questions).order_by('?')[:5]
        return random_questions


class FeedbackView(APIView):
    def post(self, request, quiz_try_id, format=None):
        # 클라이언트로부터 전송된 데이터
        data_list = request.data.get("question", [])
        response_data_list = []  # 모든 데이터의 응답을 저장할 리스트
        
        try:
            # 각 데이터를 순회하며 처리
            for i, data in enumerate(data_list):
                question = data_list[i]
                answer = request.data.get("answer", [])[i]
                order_num = request.data.get("orderNum", [])[i]
                
                # GptManager를 사용하여 피드백과 점수를 생성합니다.
                feedback_str = GptManager.generate_feedback(question, answer)
                feedback = json.loads(feedback_str)
                
                # quiz_try_id에 해당하는 인스턴스를 가져오거나 새로 생성합니다.
                quiz_try_instance = get_object_or_404(QuizTry, id=quiz_try_id)
                
                # 주어진 질문과 일치하는 GptQuestionAnswer 인스턴스를 가져옵니다.
                question_instance = get_object_or_404(GptQuestionAnswer, question=question)
                
                # GptQuestionAnswer 인스턴스의 answer을 가져옵니다.
                gpt_answer = question_instance.answer

                quiz_instance = Quiz.objects.create(
                    question=question_instance,
                    answer=answer,
                    quiz_try=quiz_try_instance,
                    orderNum=order_num,
                    feedback=feedback["feedback"],
                    score=feedback["score"],
                    gptanswer=gpt_answer
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
