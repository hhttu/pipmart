"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# from lecture6 import views as l6views


# urlpatterns = [
#     path('admin/', admin.site.urls),   
#     path('api/cards/', l6views.CardListAPIView.as_view(), name='card-list'),
#     path('api/cards/<int:pk>/',l6views.CardDetailAPIView.as_view(), name='card-detail')
# ]

from pipmart import views as pipmart_views  # Import views from the pipmart app

# urlpatterns = [
#     path('admin/', admin.site.urls),  # Django admin panel
#     path('api/items/', pipmart_views.ItemListAPIView.as_view(), name='item-list'),  # List and create items
#     path('api/items/<int:pk>/', pipmart_views.ItemDetailAPIView.as_view(), name='item-detail'),  # Retrieve, update, or delete an item
#     path('api/purchases/', pipmart_views.PurchaseListAPIView.as_view(), name='purchase-list'),  # List and create purchases
#
# ]

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin panel

    # Item endpoints
    path('api/items/', pipmart_views.ItemListAPIView.as_view(), name='item-list'),
    path('api/items/<int:pk>/', pipmart_views.ItemDetailAPIView.as_view(), name='item-detail'),

    # User endpoints
    path('api/users/', pipmart_views.UserCreateAPIView.as_view(), name='user-create'),
    path('api/users/<int:pk>/', pipmart_views.UserDetailAPIView.as_view(), name='user-detail'),
    path('api/users/login/', pipmart_views.UserLoginAPIView.as_view(), name='user-login'),

    # Purchase endpoints
    path('api/purchases/<int:pk>/', pipmart_views.PurchaseDetailAPIView.as_view(), name='purchase-detail'),
    path('api/purchases/', pipmart_views.PurchaseCreateAPIView.as_view(), name='purchase-create'),
    path('api/order/', pipmart_views.UserOrderListAPIView.as_view(), name='user-order-list'),

    #Cart
    path('api/cart/', pipmart_views.CartAPIView.as_view(), name='cart'),  # Access user's cart
]