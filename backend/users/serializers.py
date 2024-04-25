from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','nickName','password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','nickName','imgUrl')
        

class myinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nickName','password','imgUrl')

    def update(self,instance,validated_data):
        if validated_data:
            password = validated_data.pop('password', None)
            if password is not None:
                instance.set_password(password)
        return super().update(instance,validated_data)
    