from django.core.management.base import BaseCommand, CommandError
from users.models import User
from django.utils import timezone


class Command(BaseCommand):
    help = "get question from GPT"

    def handle(self, *args, **options):
            # 계정 30일뒤 삭제 함수
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
        inactive_users = User.objects.filter(deleteAt__lt=thirty_days_ago)
        inactive_users.delete()