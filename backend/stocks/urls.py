from django.urls import path
from .views import stock_data

urlpatterns = [
    path('your-endpoint/', stock_data),
]
