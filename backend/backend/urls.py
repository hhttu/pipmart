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

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin panel
    path('api/items/', pipmart_views.ItemListAPIView.as_view(), name='item-list'),  # List and create items
    path('api/items/<int:pk>/', pipmart_views.ItemDetailAPIView.as_view(), name='item-detail'),  # Retrieve, update, or delete an item
    path('api/purchases/', pipmart_views.PurchaseListAPIView.as_view(), name='purchase-list'),  # List and create purchases
    path('api/cart/', pipmart_views.CartAPIView.as_view(), name='cart'),  # Access user's cart
]

