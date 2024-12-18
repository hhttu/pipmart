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
from pipmart import views as pipmart_views 

urlpatterns = [
    path('', pipmart_views.landing_page, name='landing_page'),  # Landing page
    path('populate_db/', pipmart_views.populate_db, name='populate_db'),  # Use pipmart_views.populate_db
    
    # Item endpoints
    path('api/items/', pipmart_views.ItemListAPIView.as_view(), name='item-list'),
    path('api/items/<int:pk>/', pipmart_views.ItemDetailAPIView.as_view(), name='item-detail'),

    # User endpoints
    path('api/users/', pipmart_views.UserCreateAPIView.as_view(), name='user-create'),
    path('api/users/details/', pipmart_views.UserDetailAPIView.as_view(), name='user-detail'),
    path('api/users/login/', pipmart_views.UserLoginAPIView.as_view(), name='user-login'),
    path('api/users/change-password/', pipmart_views.ChangePasswordAPIView.as_view(), name='change-password'),

    # Purchase endpoints
    path('api/purchases/<int:pk>/', pipmart_views.PurchaseDetailAPIView.as_view(), name='purchase-detail'),
    path('api/purchases/', pipmart_views.PurchaseCreateAPIView.as_view(), name='purchase-create'),
    path('api/orders/', pipmart_views.UserOrderListAPIView.as_view(), name='user-order-list'),

    #Cart
    path('api/cart/', pipmart_views.CartAPIView.as_view(), name='cart'),  # Access user's cart
]