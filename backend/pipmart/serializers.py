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
    is_buyer = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'date_added', 'status', 'is_owner','is_buyer']

    def get_is_owner(self, obj):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            return obj.owner == request.user
        return False
    
    def get_is_buyer(self, obj):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            return obj.buyer == request.user
        return False

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class PurchaseSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    items = serializers.ListField(child=serializers.DictField())

    class Meta:
        model = Purchase
        fields = ['id', 'buyer', 'items', 'date_purchased']

    def validate_items(self, value):
        """
        Custom validation for items to check the cart price against the database price
        and to ensure the items exist.
        """
        print("Validating items")
        if not value:
            raise serializers.ValidationError("Items cannot be empty.")

        # Extract item IDs and cart prices
        item_ids = [item.get('id') for item in value]
        cart_prices = {item.get('id'): item.get('price') for item in value}

        # Validate that all IDs exist
        existing_items = Item.objects.filter(id__in=item_ids)
        if len(existing_items) != len(item_ids):
            raise serializers.ValidationError("Some items do not exist.")

        # Validate that all items are still on sale
        sold_items = [item for item in existing_items if item.status == 'purchased']

        if sold_items:
            raise serializers.ValidationError({
                "error_type": "already-sold",
                "error": "Some items have already been purchased.",
            })

        # Validate cart prices
        changed_prices = []
        for item in existing_items:
            if cart_prices.get(item.id) != item.price:
                changed_prices.append({
                    "id": item.id,
                    "cart_price": cart_prices.get(item.id),
                    "current_price": item.price
                })

        if changed_prices:
            raise serializers.ValidationError({
                "error_type": "changed-price",
                "error": "The price of some items has changed.",
                "changed_items": changed_prices
            })

        return value

    def create(self, validated_data):
        """
        Create a new purchase and mark the items as purchased.
        """
        print("Creating new purchase")
        items_data = validated_data.pop('items')
        purchase = Purchase.objects.create(buyer=self.context['request'].user)

        for item_data in items_data:
            item = Item.objects.get(id=item_data['id'])
            item.status = 'purchased'
            item.buyer = purchase.buyer
            item.save()
            purchase.items.add(item)

        return purchase
