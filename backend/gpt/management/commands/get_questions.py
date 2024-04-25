from django.core.management.base import BaseCommand
from gpt.manager import GptManager
from gpt.models import GptQuestionAnswer
import json

LEVELS = ["초등학생","중학생","고등학생","원어민","토플"]


class Command(BaseCommand):
    help = "get question from GPT"

    def handle(self, *args, **options):
        for level in LEVELS:
            # 각 level에 대해 퀴즈 생성
            for _ in range(20):
                questions = GptManager.generate_question_openai(level)
                questions = json.loads(questions)
                for question in questions["questions"]:
                    # 중복 확인
                    if not GptQuestionAnswer.objects.filter(question=question['question']).exists():
                        GptQuestionAnswer.objects.create(question=question['question'], category=question['type'], answer=question["answer"], level=level)