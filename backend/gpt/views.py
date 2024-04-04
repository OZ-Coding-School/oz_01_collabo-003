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
                        {level} 수준의 영어 퀴즈를 5개 만들어줘 조건을 반드시 지키고 형식에 맞춰서 작성해줘 줄바꿈도 적용되어야 해

                        [조건] : 밑에 조건의 랜덤으로
                        - 단어 퀴즈(영어단어주고 한글 답 쓰고)
                        - 문법 퀴즈
                        - 독해 퀴즈
                        - 단어퀴즈(한글단어주고 영어답쓰고) 
                        - 단어 맞추기 퍼즐

                        [형식] 반환형식을 json 형식으로 해줘
                        문제1 [조건]:

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