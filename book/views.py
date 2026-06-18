from rest_framework import viewsets

from .models import Book
from .serializers import BookSerializer
from .pagination import BookPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    pagination_class = BookPagination

    def get_queryset(self):
        queryset = Book.objects.all()

        title = self.request.query_params.get("title")
        author = self.request.query_params.get("author")
        price = self.request.query_params.get("price")
        quantity = self.request.query_params.get("quantity")

        if title:
            queryset = queryset.filter(
                title__icontains=title
            )

        if author:
            queryset = queryset.filter(
                author__icontains=author
            )

        if price:
            queryset = queryset.filter(
                price__gte=price
            )

        if quantity:
            queryset = queryset.filter(
                quantity__gte=quantity
            )

        return queryset
class LogoutView(APIView):

    def post(self, request):
        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_200_OK
        )