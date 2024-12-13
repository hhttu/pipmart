from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Item, Cart, Purchase

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class ItemSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'date_added', 'status', 'is_owner']

    def get_is_owner(self, obj):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            return obj.owner == request.user
        return False

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class PurchaseSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    items = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)
    class Meta:
        model = Purchase
        fields = ['id', 'buyer', 'items', 'date_purchased']
