from django.db.models import Avg, F
from django.http import JsonResponse

from rest_framework.views import APIView
from django.db import models

class MonthlyAverageScores(APIView):
    def get(self, request, user_id):
        # 월별 평균 점수 계산
        monthly_scores = self.get_monthly_scores(user_id)
        data = {'monthlyScores': list(monthly_scores)}
        return JsonResponse(data, safe=False)

    # def get_monthly_scores(self, user_id):
    #     monthly_scores = Feedback.objects \
    #         .filter(quiz__quizLevel__user_id=user_id) \
    #         .annotate(
    #             year=models.ExtractYear('createdAt'), 
    #             month=models.ExtractMonth('createdAt')
    #         ) \
    #         .values('year', 'month') \
    #         .annotate(avg_score=Avg('score')) \
    #         .order_by('year', 'month')
    #     return monthly_scores

class WeeklyAverageScores(APIView):
    def get(self, request, user_id):
        # 주별 평균 점수 계산
        weekly_scores = self.get_weekly_scores(user_id)
        data = {'weeklyScores': list(weekly_scores)}
        return JsonResponse(data, safe=False)

    # def get_weekly_scores(self, user_id):
    #     weekly_scores = Feedback.objects \
    #         .filter(quiz__quizLevel__user_id=user_id) \
    #         .annotate(
    #             year=models.ExtractYear('createdAt'), 
    #             week=models.ExtractWeek('createdAt')
    #         ) \
    #         .values('year', 'week') \
    #         .annotate(avg_score=Avg('score')) \
    #         .order_by('year', 'week')
    #     return weekly_scores

class DailyAverageScores(APIView):
    def get(self, request, user_id):
        # 일별 평균 점수 계산
        daily_scores = self.get_daily_scores(user_id)
        data = {'dailyScores': list(daily_scores)}
        return JsonResponse(data, safe=False)

    # def get_daily_scores(self, user_id):
    #     daily_scores = Feedback.objects \
    #         .filter(quiz__quizLevel__user_id=user_id) \
    #         .annotate(
    #             year=models.ExtractYear('createdAt'), 
    #             month=models.ExtractMonth('createdAt'),
    #             day=models.ExtractDay('createdAt')
    #         ) \
    #         .values('year', 'month', 'day') \
    #         .annotate(avg_score=Avg('score')) \
    #         .order_by('year', 'month', 'day')
    #     return daily_scores