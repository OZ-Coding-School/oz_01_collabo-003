from django.http import JsonResponse
from django.conf import settings
from openai import OpenAI
import openai
from django.views.decorators.csrf import csrf_exempt
import json
# OpenAI API 키 설정
client = OpenAI(
    # api_key = settings.OPENAI_API_KEY
    api_key = settings.OPENAI_API_KEY
)

# gpt에서 퀴즈 질문 5개 받아오는 기능
@csrf_exempt
def quiz(request):
    if request.method == "POST":
        level = request.POST.get('level')
        
        try:
            res = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role" : "system",
                        "content" : f'''
                        영어 공부하는 문제 5개를 만들거야 문제 만들 때 난이도는 {level} 수준으로 만들어줘
                        

                        퀴즈1: 영어 단어 퀴즈 (영어단어를 한글로 맞추는 퀴즈) 
                        퀴즈2: 한글 단어 퀴즈 (한글단어를 영어로 맞추는 퀴즈) 
                        퀴즈3: 영어 문장 빈칸 채우기 퀴즈 (영어 문장의 퀴즈에 빈칸에 들어갈 단어 맞추기)
                        퀴즈4: 영어 문장 퀴즈 (영어문장 퀴즈를 한글로 맞추기)
                        퀴즈5: 한글 문장 퀴즈 (한글문장 퀴즈를 영어로 맞추기)

                        아래 작성하는 조건은 반드시 지켜줘

                        조건1: 반환형식을 json 형식으로 해줘
                        조건2: 퀴즈 1번 부터 5번까지 순서대로 나오게 해줘 단 출력시 퀴즈설명 없이 딱 퀴즈만 나오게 해줘
                        조건3: 퀴즈는 겹치지 않게 섞어서 내줘
                        조건4: 퀴즈는 설명없이 핵심 질문만 적어줘 
                        조건5: {level} 수준에 맞는 퀴즈를 만들어줘 apple,사과 같은 너무 쉬운 단어는 반드시 나오지 않게 해줘

                        '''
                    }
                ],
                temperature=0.5,
                max_tokens=1000
            )
            return JsonResponse(json.loads(res.choices[0].message.content))
        except openai.RateLimitError as e:
            return JsonResponse({"error": "API 요청 한도를 초과했습니다."}, status=429)
        except openai.APIConnectionError as e:
            return JsonResponse({"error": "OpenAI API에 연결할 수 없습니다."}, status=503)
        except Exception as e:
            return JsonResponse({"error": "알 수 없는 오류가 발생했습니다."}, status=500)
    else:
        return JsonResponse({"error": "POST 요청이 필요합니다."}, status=400)
    

# gpt 질문과 유저 답변으로 피드백과 점수를 받아오는 기능
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
