from rest_framework import serializers
from .models import QuizLevel

class QuizLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizLevel
        fields = '__all__'