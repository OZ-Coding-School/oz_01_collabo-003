from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User
from quizs.models import Quiz


class RegisterAPITestCase(APITestCase):
    def test_register(self):
        url = reverse('register')
        data = {
            "email": "jdd05274@naver.com",
            "nickName": "test",
            "password": "test"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='jdd05274@naver.com', password='test',nickName= "test",)

    def test_login(self):
        url = reverse('login')
        data = {
            'email': 'jdd05274@naver.com',
            'password': 'test',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        
class MyinfoAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='jdd05274@naver.com', password='test', nickName="test")

    def test_myinfoGet(self):
        url = reverse('myinfo',kwargs={'user_id': self.user.id})
        self.client.force_login(self.user)  # 로그인
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_myinfoPut(self):
        url = reverse('myinfo',kwargs={'user_id': self.user.id})
        self.client.force_login(self.user)  # 로그인
        data = {
            "user": self.user.id,
            "nickName": "test1",
            "password": "test1",
            "imgUrl": "test"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class LogoutAPITestCase(APITestCase):
    def test_logout(self):
        url = reverse('logout')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
