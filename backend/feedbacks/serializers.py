from rest_framework import serializers
from .models import Feedback
from.models import Quiz

class FeedbackSerializer(serializers.Serializer):
    class meta:
        model = Feedback
        fields = ('content', 'score', 'createdAt', 'quiz')

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)
    
