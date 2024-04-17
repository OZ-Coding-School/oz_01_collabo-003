from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .gptmanages import gptmanage
from .models import GptElementary, GptMiddle, GptNative, GptHigh, GptToeic
from rest_framework.views import APIView
from .serializers import GptElementarySerializer, GptHighSerializer, GptToeicSerializer, GptNativeSerializer, GptMiddeltonSerializer
# from celery import shared_task
import json

@csrf_exempt
# @shared_task
def generate_english_elementary_quiz(requset):
    
    # 100개 퀴즈 생성
    for _ in range(20):
        questions = gptmanage.generate_question_elementary_openai()
        questions = json.loads(questions)
        for question in questions["questions"]:
        # 중복 확인
            if not GptElementary.objects.filter(question=question['question']).exists():
                # 중복되지 않은 경우 퀴즈 저장
                GptElementary.objects.create(question=question['question'], category=question['type'])
    return JsonResponse({"message": "English quiz generated successfully!"})

@csrf_exempt
# @shared_task
def generate_english_middle_quiz(requset):

    # 100개 퀴즈 생성
    for _ in range(20):
        questions = gptmanage.generate_question_middle_openai()
        questions = json.loads(questions)
        for question in questions["questions"]:
        # 중복 확인
            if not GptMiddle.objects.filter(question=question['question']).exists():
                # 중복되지 않은 경우 퀴즈 저장
                GptMiddle.objects.create(question=question['question'], category=question['type'])
    return JsonResponse({"message": "English quiz generated successfully!"})

@csrf_exempt
# @shared_task
def generate_english_high_quiz(requset):

# 100개 퀴즈 생성
    for _ in range(20):
        questions = gptmanage.generate_question_high_openai()
        questions = json.loads(questions)
        for question in questions["questions"]:
        # 중복 확인
            if not GptHigh.objects.filter(question=question['question']).exists():
                # 중복되지 않은 경우 퀴즈 저장
                GptHigh.objects.create(question=question['question'], category=question['type'])
    return JsonResponse({"message": "English quiz generated successfully!"})

@csrf_exempt
# @shared_task
def generate_english_native_quiz(requset):
    # 100개 퀴즈 생성
    for _ in range(20):
        questions = gptmanage.generate_question_native_openai()
        questions = json.loads(questions)
        for question in questions["questions"]:
        # 중복 확인
            if not GptNative.objects.filter(question=question['question']).exists():
                # 중복되지 않은 경우 퀴즈 저장
                GptNative.objects.create(question=question['question'], category=question['type'])
    return JsonResponse({"message": "English quiz generated successfully!"})

@csrf_exempt
# @shared_task
def generate_english_toeic_quiz(requset):
    # 100개 퀴즈 생성
    for _ in range(20):
        questions = gptmanage.generate_question_toeic_openai()
        questions = json.loads(questions)
        for question in questions["questions"]:
        # 중복 확인
            if not GptToeic.objects.filter(question=question['question']).exists():
                # 중복되지 않은 경우 퀴즈 저장
                GptToeic.objects.create(question=question['question'], category=question['type'])
    return JsonResponse({"message": "English quiz generated successfully!"})

class GptElementaryAPIView(APIView):
    def get(self, request):
        elementary = GptElementary.objects.all()
        serializer = GptElementarySerializer(elementary, many=True)
        return JsonResponse(serializer.data, safe=False)
    

class GptMiddelAPIView(APIView):
    def get(self, request):
        middle = GptMiddle.objects.all()
        serializer = GptMiddeltonSerializer(middle, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class GptHighAPIView(APIView):
    def get(self, request):
        high = GptHigh.objects.all()
        serializer = GptHighSerializer(high, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class GptNativeAPIView(APIView):
    def get(self, request):
        native = GptNative.objects.all()
        serializer = GptNativeSerializer(native, many=True)
        return JsonResponse(serializer.data, safe=False)

class GptToeciAPIView(APIView):
    def get(self, request):
        toeic = GptToeic.objects.all()
        serializer = GptToeicSerializer(toeic, many=True)
        return JsonResponse(serializer.data, safe=False)
    

@csrf_exempt
def feedback(request):
    if request.method == "POST":
        # POST 요청에서 데이터 추출
        data = json.loads(request.body)

        question = data.get('question')
        answer = data.get('answer')

        # OpenAI에 데이터 전송
        try:
            feedback_object = gptmanage.generate_feedback(question, answer)
            feedback_object = json.loads(feedback_object)
            # OpenAI의 응답에서 피드백 및 점수 추출
            # 피드백 및 점수를 JSON 응답으로 반환
            return JsonResponse(feedback_object, status=200)
        except Exception as e:
            # OpenAI API 요청 중 오류가 발생한 경우 에러 응답 반환
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)