from django.urls import path
from .views import BookViewSet

book_list = BookViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

book_detail = BookViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('books/', book_list),
    path('books/<int:pk>/', book_detail),
]