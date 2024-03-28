from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

class HelloWorld(APIView):

    def get(self,request):
        data = {'message': 'Hello World!no'}
        return Response(data)