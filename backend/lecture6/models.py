from django.db import models

class Card(models.Model):
    color = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.color
