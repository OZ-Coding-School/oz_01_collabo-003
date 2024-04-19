from rest_framework import serializers
from .models import GptQuestionAnswer

class GptQuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptQuestionAnswer
        fields = '__all__'


class GptQuestionAnswerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptQuestionAnswer
        fields = ("id","question","category")

