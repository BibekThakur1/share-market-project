from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Share Market API")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('news.urls')),
    path('', home),
]
