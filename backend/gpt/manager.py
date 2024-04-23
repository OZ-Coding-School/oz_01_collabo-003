from openai import OpenAI
from django.conf import settings

# OpenAI API 키 설정
client = OpenAI(
    # api_key = settings.OPENAI_API_KEY
    api_key = settings.OPENAI_API_KEY
)

example = """{
    "questions": [
        {
            "type": "English vocabulary question in English",
            "question": "'book'",
            "answer":""
        },
        {
            "type": "Korean vocabulary question about English",
            "question": "‘사과'",
            "answer":""
        },
        {
            "type": "English fill-in-the-blank",
            "question": "The opposite of 'night' is '___.",
            "answer":""
        },
        {
            "type": "Translate the English sentence",
            "question": "'The cat sits on the mat.'",
            "answer":""
        },
        {
            "type": "Translate the Korean sentence to English",
            "question": "저는 매일 아침에 조깅을 합니다.",
            "answer":""
        }
    ]
}
"""

class GptManager():
    @classmethod
    def generate_question_openai(cls, level):
        # OpenAI API를 사용하여 퀴즈 질문 생성
        return cls.gpt_call(f'''영어 퀴즈 문제를 만들거야 문제를 만들때 아래 조건, 형식의 예시를 무조건 지키고 {level} 수준으로 영어퀴즈를 만들어줘 질문은 한개만 리턴값은 JSON 형식으로 해줘,답도 나오게 해줘 일관성 있게 해야 해
                        다음은 예시야 type을 한국어로 번역해서 만들어줘 영어 단어는 다양하게 내줘{example}''')

    @classmethod
    def generate_feedback(cls,question, answer):
        return cls.gpt_call(f'''질문: {question}\n답변: {answer}\n피드백과 점수를 json 형식으로 점수는 20점 만점으로 생성해주세요.
                정답이면 정답이라고만 적어주고 틀리면 자세하게 알려주고 정답도 알려줘,점수 기준은 형식은
                        "feedback": "피드백"
                        "score": 20''')
    
    def gpt_call(content):
        res = client.chat.completions.create(
                model="gpt-4",
                messages=[{"role" : "system", "content" : content}],
                temperature=0.5,
                max_tokens=1000
            )
        feedback = res.choices[0].message.content
        return feedback 