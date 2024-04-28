from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import CustomUser, Otp,Category, Product, Review, CartItem
from django.contrib.auth import authenticate
from .serializer import CustomUserSerializer, OtpSerializer, LoginSerializer, ProductSerializer, CategorySerializer, ReviewSerializer, AddCartSerializer
from .utils import generate_and_save_otp, send_otp_email

from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
# Create your views here.


# AUTHENTICATION
class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')

            if CustomUser.objects.filter(Q(username=username) | Q(email=email)).exists():
                return Response({'error': 'Username or Emial already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()

            otp_instance = generate_and_save_otp(user)
            send_otp_email(user.email, otp_instance)

            return Response({'message':'Otp sent to your email, Please verify.', 'user_id':user.id})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VerifyOtp(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = OtpSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            otp_value = serializer.validated_data['otp']

            try:
                otp_instance = Otp.objects.get(user=user)

                if otp_value == otp_instance.otp:
                    user.is_active = True
                    user.is_verified = True
                    user.save(update_fields=['is_active', 'is_verified'])
                    otp_instance.delete()

                    expiration_time = datetime.utcnow() + timedelta(days=1)

                    token = RefreshToken.for_user(user)
                    token.payload = {"id": user.id,
                                     "username": user.username, 
                                     "active": user.is_active, 
                                     "verified": user.is_verified,
                                     "is_superuser": user.is_superuser,
                                     "exp": expiration_time.timestamp(),
                                     }

                    return Response({'token':str(token), 'message':'User is verified and activated.'}, status=status.HTTP_200_OK)
                else:
                      return Response({'message':'Invalid OTP.'},status=status.HTTP_400_BAD_REQUEST)
            except Otp.DoesNotExist:
                return Response({'message':'Otp not found for the user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(APIView):
    permission_class = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                expiration_time = datetime.utcnow() + timedelta(days=1)
                token = RefreshToken.for_user(user)
                token.payload = {"id": user.id,
                                 "username": user.username, 
                                 "active": user.is_active, 
                                 "verified": user.is_verified,
                                 "is_superuser": user.is_superuser,
                                 "exp": expiration_time.timestamp(),
                                 }
                
                return Response({'token': str(token), 'message': 'Login sucessfull.'}, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 # AUTHENTICATION            

class AddCategory(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
             
    


class AddProduct(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 


    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   


class SingleProduct(APIView):
    permission_classes = [AllowAny]
    def get(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class EditProduct(APIView):
    permission_classes = [AllowAny]
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteProduct(APIView):
    permission_classes = [AllowAny]
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        product.delete()
        return Response(status=status.HTTP_200_OK)

class AddReview(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        product_id = request.query_params.get('product_id')
        if not product_id:
            return Response({'error': 'product_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        reviews = Review.objects.filter(product__id=product_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request): 
        serializer = ReviewSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)    
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class DeleteReview(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id, user=request.user)
            review.delete()
            return Response({'message': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found or you do not have permission to delete it'}, status=status.HTTP_404_NOT_FOUND)
            



class AddCart(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = AddCartSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        cartitem = CartItem.objects.filter(user=request.user)
        serializer = AddCartSerializer(cartitem, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    