from rest_framework import serializers
from .models import CustomUser, Otp, Category, Product, Review, CartItem

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
class OtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Otp
        fields = ['user', 'otp', 'created_at']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class AddCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
