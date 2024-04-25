from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/user/', include('users.urls')),
    path('api/v1/gpt/', include('gpt.urls')),
    path('api/v1/quiz/',include('quizs.urls')),
]
