from rest_framework import serializers
from .models import GptElementary, GptHigh, GptMiddle, GptNative, GptToeic

class GptElementarySerializer(serializers.ModelSerializer):
    class Meta:
        model = GptElementary
        fields = '__all__'
    
class GptHighSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptHigh
        fields = '__all__'

class GptNativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptNative
        fields = '__all__'

class GptToeicSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptToeic
        fields = '__all__'

class GptMiddeltonSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptMiddle
        fields = '__all__'