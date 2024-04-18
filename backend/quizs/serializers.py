from rest_framework import serializers
from .models import Quiz,QuizTry


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"

    def create(self, validated_data):
        return Quiz.objects.create(**validated_data)
class QuizAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'question']
class QuiztrySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizTry
        fields = "__all__"

    def create(self, validated_data):
        return QuizTry.objects.create(**validated_data)