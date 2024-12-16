from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from pipmart.models import Item, Purchase, Cart, User
from pipmart.serializers import ItemSerializer, PurchaseSerializer, CartSerializer, UserSerializer
from django.shortcuts import render
from django.http import JsonResponse
import random

def populate_db(request):
    # Clear existing data
    User.objects.all().delete()
    Item.objects.all().delete()

    # Create 6 users
    for i in range(1, 7):
        user = User.objects.create_user(
            username=f"testuser{i}",
            password=f"pass{i}",
            email=f"testuser{i}@shop.aa"
        )

        # Create 10 items for the sellers (users 1, 2, and 3)
        if i <= 3:  # sellers are users 1, 2, and 3
            for j in range(10):
                Item.objects.create(
                    title=f"Item {i * 10 + j}",
                    description=f"Description for Item {i * 10 + j}",
                    price=random.randint(10, 100),
                    status="on-sale",  # Default status
                    owner=user
                )

    # Return a success message as JsonResponse (optional for debugging)
    return JsonResponse({"message": "Database populated successfully!"})

def landing_page(request):
    if request.method == "POST" and request.user.is_anonymous:
        # Trigger the populate_db view logic
        populate_db(request)

        # Set a success message using Django messages framework
        messages.success(request, "Database populated successfully with 6 users and 30 items!")
        return render(request, 'landing_page.html')  # Render the template with the success message

    return render(request, 'landing_page.html')  # Default rendering of the pa

class ItemListAPIView(APIView):
    def get(self, request):
        items = Item.objects.all()  # Get all items
        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(owner=request.user)  # Assuming the item owner is the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ItemSerializer(item, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # `request.user` contains the user associated with the token
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserCreateAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password = request.data.get('password')

            user = serializer.save()
            user.set_password(password)  # Hashes the password
            user.save()

            token, created = Token.objects.get_or_create(user=user)  # Create a token for the user
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)  # Authenticate user by username and password
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
class ChangePasswordAPIView(APIView):
     def post(self, request):
        user = request.user  # Get the authenticated user
        
        if user.is_anonymous:  # If the user is not authenticated
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        # Validate current password
        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate new password is provided
        if not new_password:
            return Response({"error": "New password cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

class CartAPIView(APIView):
    def get(self, request):
        try:
            cart = Cart.objects.get(user=request.user)  # Get the cart for the logged-in user
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    # Call when user add new item to the cart
    def post(self, request):
        try:
            cart, created = Cart.objects.get_or_create(user=request.user)  # Get or create the user's cart
        except Cart.MultipleObjectsReturned:
            return Response({"error": "Multiple carts found for user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        item_id = request.data.get('item_id')  # Expecting 'item_id' in the request body
        if not item_id:
            return Response({"error": "Item ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the item is already in the cart
        if cart.items.filter(id=item.id).exists():
            return Response({"error": "Item is already in the cart"}, status=status.HTTP_400_BAD_REQUEST)

        # Add the item to the cart
        cart.items.add(item)
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Call when the user remove one item from the cart
    def put(self, request):
        try:
            cart = Cart.objects.get(user=request.user)  # Get the cart for the logged-in user
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        # Extract item ID to remove from the request body
        item_id = request.data.get("item_id")
        if not item_id:
            return Response({"error": "Item ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        print(cart.items)
        try:
            item = cart.items.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found in the cart"}, status=status.HTTP_404_NOT_FOUND)

        # Remove the item from the cart
        cart.items.remove(item)
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    # Call when the user remove the last item from the cart or finish purchase
    def delete(self, request):
        try:
            cart = Cart.objects.get(user=request.user)  # Get the cart for the logged-in user
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        # Clear the cart
        cart.delete()

        return Response({"message": "Cart cleared successfully"}, status=status.HTTP_200_OK)
    
class PurchaseDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            purchase = Purchase.objects.get(pk=pk)
        except Purchase.DoesNotExist:
            return Response({"error": "Purchase not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PurchaseSerializer(purchase)
        return Response(serializer.data)

class PurchaseCreateAPIView(APIView):
    def post(self, request):
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            items = serializer.validated_data['items']
            existing_items = Item.objects.filter(id__in=[item.id for item in items])

            # Check for items that are already sold
            sold_items = [item for item in existing_items if item.status == 'sold']

            if sold_items:
                sold_item_titles = [item.title for item in sold_items]
                return Response(
                    {
                        "error": "Some items have already been purchased.",
                        "sold_items": sold_item_titles,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the price of the items in the cart hasn't changed
            changed_prices = [item for item in existing_items if item.price != next((i.price for i in items if i.id == item.id), None)]

            if changed_prices:
                return Response(
                    {
                        "error": "The price of some items has changed.",
                        "changed_items": [{"id": item.id, "price": item.price} for item in changed_prices],
                    },
                    status=status.HTTP_409_CONFLICT,
                )

            # If no sold items, proceed to create the purchase
            purchase = serializer.save(buyer=request.user)
            for item in items:
                item.status = 'sold'
                item.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PurchaseListAPIView(APIView):
    def get(self, request):
        purchases = Purchase.objects.all()  # Fetch all purchases
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

class UserOrderListAPIView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        # Fetch purchases for the authenticated user
        purchases = Purchase.objects.filter(buyer=request.user)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
