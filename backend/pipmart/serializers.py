from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Item, Cart, Purchase

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if 'password' in representation:
            del representation['password']
        return representation

class ItemSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    buyer = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'date_added', 'status', 'is_owner','buyer']
        read_only_fields = ['buyer'] 

    def get_is_owner(self, obj):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            return obj.owner == request.user
        return False
    
    def get_buyer(self, obj):
        if obj.buyer:  
            return {
                "id": obj.buyer.id,
                "username": obj.buyer.username,
                "email": obj.buyer.email
            }
        return None

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
