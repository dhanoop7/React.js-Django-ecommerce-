from django.urls import path
from .views import RegisterUser, UserLogin,  VerifyOtp, AddProduct, AddCategory, SingleProduct, EditProduct, DeleteProduct, AddReview, DeleteReview, AddCart

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('verifyotp/', VerifyOtp.as_view(), name='verifyotp'),
    path('login/', UserLogin.as_view(), name='login'),
    path('addcategory/', AddCategory.as_view(), name='addcategory'),
    path('addproduct/', AddProduct.as_view(), name='addproduct'),
    path('singleproduct/<int:product_id>/', SingleProduct.as_view(), name='singleproduct'),
    path('editproduct/<int:product_id>/', EditProduct.as_view(), name='editproduct'), 
    path('deleteproduct/<int:product_id>/', DeleteProduct.as_view(), name='deleteproduct'),
    path('addreview/', AddReview.as_view(), name='addreview'),
    path('deletereview/<int:review_id>/', DeleteReview.as_view(), name='deletereview'),
    path('addtocart/', AddCart.as_view(), name='addtocart'),

]
