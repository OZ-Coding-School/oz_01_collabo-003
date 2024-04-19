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

# class GetUserDataAPIViewTest(APITestCase):
#     def setUp(self):
#         # 테스트를 위한 사용자 생성
#         self.user = User.objects.create_user(email='test@example.com', password='test', nickName="TestUser")
        
#         # 사용자와 관련된 퀴즈 및 피드백 생성
#         self.quizzes = []
#         self.feedbacks = []
#         for i in range(1, 6):
#             quiz = Quiz.objects.create(user=self.user, content=f"퀴즈 {i}", answer=f"답변 {i}", orderNum=i)
#             feedback = Feedback.objects.create(quiz=quiz, content=f"피드백 {i}", score=i)
#             self.quizzes.append(quiz)
#             self.feedbacks.append(feedback)
    
#     def test_get_user_data(self):
#         # 사용자의 정보와 관련된 퀴즈 및 피드백 데이터를 가져오는 API 테스트
        
#         # API 엔드포인트 URL 생성
#         url = reverse('get_user_data', kwargs={'user_id': self.user.id})
        
#         # API 호출
#         response = self.client.get(url)
        
#         # 응답 코드 확인
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
        
#         # 응답 데이터 확인
#         data = response.data
#         self.assertIn('user', data)
#         self.assertIn('quizzes', data)
        
#         # 사용자 정보 확인
#         user_data = data['user']
#         self.assertEqual(user_data['id'], self.user.id)
#         self.assertEqual(user_data['email'], self.user.email)
#         self.assertEqual(user_data['nickName'], self.user.nickName)
        
#         # 퀴즈 및 피드백 데이터 확인
#         quizzes_data = data['quizzes']
#         self.assertEqual(len(quizzes_data), 5)  # 퀴즈는 최대 5개까지만 반환되어야 함
#         for i, quiz_data in enumerate(quizzes_data):
#             self.assertEqual(quiz_data['content'], f"퀴즈 {i+1}")
#             self.assertEqual(quiz_data['answer'], f"답변 {i+1}")
#             self.assertEqual(quiz_data['feedback'], f"피드백 {i+1}")
#             self.assertEqual(quiz_data['score'], i+1)