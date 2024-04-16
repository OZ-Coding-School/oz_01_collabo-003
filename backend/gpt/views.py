from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .gptmanage import gpt
from celery import shared_task
from .models import GptElementary, GptMiddle, GptNative, GptHigh, GptToeic

@csrf_exempt
# @shared_task
def generate_english_elementary_quiz(requset):
    # 퀴즈 생성
        # 퀴즈 생성
    questions = gpt.generate_question_elementary_openai()
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
    # 퀴즈 생성
        # 퀴즈 생성
    questions = gpt.generate_question_middle_openai()
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
    # 퀴즈 생성
        # 퀴즈 생성
    questions = gpt.generate_question_high_openai()
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
    # 퀴즈 생성
        # 퀴즈 생성
    questions = gpt.generate_question_native_openai()
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
    # 퀴즈 생성
        # 퀴즈 생성
    questions = gpt.generate_question_toeic_openai()
    questions = json.loads(questions)
    for question in questions["questions"]:
    # 중복 확인
        if not GptToeic.objects.filter(question=question['question']).exists():
            # 중복되지 않은 경우 퀴즈 저장
            GptToeic.objects.create(question=question['question'], category=question['type'])
            

    return JsonResponse({"message": "English quiz generated successfully!"})
