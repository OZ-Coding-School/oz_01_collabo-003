from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import Group, Permission

class UserManager(BaseUserManager):

    def create_user(self, userId, nickName, password=None):
        if not userId:
            raise ValueError('User ID must be provided')

        user = self.model(
            userId=userId,
            nickName=nickName,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, userId, nickName, password):
        superuser = self.create_user(
            userId=userId,
            nickName=nickName,
            password=password,
        )
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser, PermissionsMixin):
    userId = models.CharField(max_length=100, unique=True)
    nickName = models.CharField(max_length=100)
    imgUrl = models.TextField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'userId'


    class Meta:
        db_table = 'user'
        