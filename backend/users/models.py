from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import Group, Permission

class UserManager(BaseUserManager):

    def create_user(self, email, nickName, password=None):
        if not email:
            raise ValueError('User ID must be provided')

        user = self.model(
            email=email,
            nickName=nickName,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, nickName, password):
        superuser = self.create_user(
            email=email,
            nickName=nickName,
            password=password,
        )
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser, PermissionsMixin):
    nickName = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=100,unique=True) 
    imgUrl = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickName']


    class Meta:
        db_table = 'user'
        