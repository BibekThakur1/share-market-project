from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def stock_data(request):
    data = [
        {
            "id": 1,
            "name": "Nabil Bank",
            "price": 890.50,
            "change": 1.23,
            "volume": 15000,
        },
        {
            "id": 2,
            "name": "Nepal Life",
            "price": 1270.00,
            "change": -0.75,
            "volume": 8000,
        },
    ]
    return Response(data)
