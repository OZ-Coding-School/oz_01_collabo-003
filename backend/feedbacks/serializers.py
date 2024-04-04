from rest_framework import serializers
from .models import Feedback
from.models import Quiz

class FeedbackSerializer(serializers.Serializer):
    content = serializers.CharField()
    score = serializers.IntegerField()
    createdAt = serializers.DateTimeField()
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())

    class meta:
        model = Feedback
        fields = ('content', 'score', 'createdAt', 'quiz')

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)