from rest_framework import viewsets

from .models import Book
from .serializers import BookSerializer
from .pagination import BookPagination


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