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
