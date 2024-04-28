from django.contrib import admin
from .models import CustomUser, Otp, Product, CartItem, Category, Review

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Otp)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Category)
admin.site.register(Review)