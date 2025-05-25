# news/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import NewsArticle
from .serializers import NewsArticleSerializer

class NewsArticleList(APIView):
    def get(self, request):
        articles = NewsArticle.objects.all()
        serializer = NewsArticleSerializer(articles, many=True)
        return Response(serializer.data)
