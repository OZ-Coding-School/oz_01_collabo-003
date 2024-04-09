from django.http import JsonResponse
from django.conf import settings
from openai import OpenAI
import openai
from django.views.decorators.csrf import csrf_exempt
import json
from quizs.models import Quiz
# OpenAI API 키 설정
client = OpenAI(
    # api_key = settings.OPENAI_API_KEY
    api_key = settings.OPENAI_API_KEY
)

@csrf_exempt
def quiz(request):
    if request.method == "POST":
        data = json.loads(request.body)
        level = data.get('level')
        try:
            # 사용자가 선택한 난이도의 질문을 데이터베이스에서 가져옵니다.
            existing_questions = Quiz.objects.filter(
                quizLevel__level=level
            )

            # GPT 모델을 사용하여 새로운 질문을 생성합니다.
            res: Completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role" : "system",
                        "content" : f'''
                        영어 퀴즈 문제를 만들거야 문제를 만들때 아래 조건, 형식의 예시를 무조건 지키고 {level}수준으로 영어퀴즈를 만들어줘
                        
                        [조건]
                        조건1: 반환형식을 json 형식으로 해줘
                        조건2: 정답은 나오면 안돼

                        [형식]
                        문제1: 영어 단어만
                        문제2: 한글만 단어만
                        문제3: 영어 문장 빈칸 채우기 퀴즈 (영어 문장의 퀴즈에 빈칸에 들어갈 단어 맞추기만)
                        문제4: 영어 문장만
                        문제5: 한글 문장만

                        '''
                    }
                ],
                temperature=0.5,
                max_tokens=1000
            )
            
            new_question_content = json.loads(res.choices[0].message.content)

            # 중복되지 않는 새로운 질문을 필터링합니다.
            new_questions = []
            for question_content in new_question_content.values():
                if not existing_questions.filter(content=question_content).exists() and question_content not in new_questions:
                    new_questions.append(question_content)

            # 만약에 새로운 질문이 5개가 되지 않았다면, 추가로 생성하여야 합니다.
            while len(new_questions) < 5:
                res = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role" : "system",
                            "content" : f'''
                            영어 퀴즈 문제를 만들거야 문제를 만들때 아래 조건, 형식을 무조건 지키고 {level}수준으로 영어퀴즈를 만들어줘
                            
                            [조건]
                            조건1: 반환형식을 json 형식으로 해줘
                            조건1: 반환형식을 json 형식으로 해줘
                            조건2: 정답은 나오면 안돼
                            조건3: 문제 설명과 문제가 나와야 한다.

                            [형식]
                            문제1: 영어 단어만 나와야 해
                            문제2: 한글만 단어만 나와야 해
                            문제3: 영어 문장 빈칸 채우기 퀴즈 (영어 문장의 퀴즈에 빈칸에 들어갈 단어 맞추기만)
                            문제4: 영어 문장만 나와야 해
                            문제5: 한글 문장만 나와야 해

                            '''
                        }
                    ],
                    temperature=0.5,
                    max_tokens=1000
                )
                
                new_question_content = json.loads(res.choices[0].message.content)

                # 중복되지 않는 새로운 질문을 필터링합니다.
                for question_content in new_question_content.values():
                    if not existing_questions.filter(content=question_content).exists() and question_content not in new_questions:
                        new_questions.append(question_content)

            # 5개씩 새로운 질문을 반환합니다.
            return JsonResponse({"questions": new_questions[:5]})
        except openai.RateLimitError as e:
            return JsonResponse({"error": "API 요청 한도를 초과했습니다."}, status=429)
        except openai.APIConnectionError as e:
            return JsonResponse({"error": "OpenAI API에 연결할 수 없습니다."}, status=503)
        except Exception as e:
            return JsonResponse({"error": f"알 수 없는 오류가 발생했습니다.{e}"}, status=500)
    else:
        return JsonResponse({"error": "POST 요청이 필요합니다."}, status=400)
# def feedback(request):
#     if request.method == "POST":
#         # POST 요청에서 데이터 추출
#         data = request.POST

#         # Serializer를 사용하여 데이터 직렬화
#         serializer = FeedbackSerializer(data=data)

#         if serializer.is_valid():
#             # Serializer가 유효한 경우, 데이터 추출
#             question = serializer.validated_data.get('question')
#             answer = serializer.validated_data.get('answer')

#             # OpenAI에 데이터 전송
#             try:
#                 response = openai.Completion.create(
#                     engine="text-davinci-002",  # 사용할 GPT 엔진 선택
#                     prompt=f"질문: {question}\n답변: {answer}\n피드백과 점수를 생성해주세요.",
#                     temperature=0.7,
#                     max_tokens=150,
#                     n=1
#                 )

#                 # OpenAI의 응답에서 피드백 및 점수 추출
                

#                 # 피드백 및 점수를 JSON 응답으로 반환
#                 return JsonResponse(json.loads(response.choices[0].text), status=200)
#             except Exception as e:
#                 # OpenAI API 요청 중 오류가 발생한 경우 에러 응답 반환
#                 return JsonResponse({"error": str(e)}, status=500)
#         else:
#             # Serializer가 유효하지 않은 경우, 오류 응답 반환
#             return JsonResponse(serializer.errors, status=400)

#     # POST 요청이 아닌 경우에는 에러 응답 반환
#     return JsonResponse({"error": "POST 요청이 필요합니다."}, status=400)
