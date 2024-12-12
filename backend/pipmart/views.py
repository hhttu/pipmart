from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from pipmart.models import Item, Purchase, Cart, User
from pipmart.serializers import ItemSerializer, PurchaseSerializer, CartSerializer, UserSerializer

class ItemListAPIView(APIView):
    def get(self, request):
        items = Item.objects.all()  # Get all items
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
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
        
        serializer = ItemSerializer(item)
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
    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
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
            serializer.save(buyer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PurchaseListAPIView(APIView):
    def get(self, request):
        purchases = Purchase.objects.all()  # Fetch all purchases
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

class UserOrderListAPIView(APIView):
    def get(self, request):
        user_id = request.GET.get('user')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        purchases = Purchase.objects.filter(buyer=user)  # List purchases for a specific user
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
