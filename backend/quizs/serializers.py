from rest_framework import serializers
from .models import Quiz
class QuizSerializer(serializers.ModelSerializer):
    
    content = serializers.CharField()
    answer = serializers.CharField()
    orderNum = serializers.IntegerField()
    user = serializers.IntegerField()

    class Meta:
        model = Quiz
        fields = "__all__"

    def create(self, validated_data):
        return Quiz.objects.create(**validated_data)
    
