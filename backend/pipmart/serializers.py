from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Item, Cart, Purchase

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ItemSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'date_added', 'status', 'owner']

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = ItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class PurchaseSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'buyer', 'item', 'date_purchased']
