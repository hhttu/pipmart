from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    STATUS_CHOICES = [
        ('on-sale', 'On Sale'),
        ('sold', 'Sold'),
        ('purchased', 'Purchased'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.FloatField()
    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='on-sale')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    items = models.ManyToManyField(Item, related_name='in_carts')

    def __str__(self):
        return f"Cart of {self.user.username}"

class Purchase(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchases')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='purchases')
    date_purchased = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item.title} purchased by {self.buyer.username}"
