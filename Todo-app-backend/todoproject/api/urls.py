from django import views
from django.urls import path
from .views import TodoListCreateAPIView, TodoDetailsAPIView, CheckInsListCreateAPIView, delete_checkIns, ai_assistant, PromptResponseListCreateAPIView, delete_chat_message, RegisterView, forgot_password, PasswordResetConfirmView, verifyEmail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/todos/', TodoListCreateAPIView.as_view(), name='todo-list-create'),
    
    path('api/todos/<int:pk>/', TodoDetailsAPIView.as_view(), name='todo-detail'),
    
    path('api/checkIns/', CheckInsListCreateAPIView.as_view(), name='checkIn-list-create'),
    
    path('api/checkIns/deleteTodo/<int:pk>/', delete_checkIns, name='delete-checkIns'),
    
    path('api/chatMessage/deleteTodo/<int:pk>/', delete_chat_message, name='delete-chat-message'),
    
    path('api/aiAssistant/', ai_assistant, name='aiAssistant'),
    
    path('api/savePrompt/', PromptResponseListCreateAPIView.as_view(), name='savePrompt'),
    
    path('api/register/', RegisterView.as_view(), name='register'),
    
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    
    path('token/refresh/', TokenRefreshView.as_view()),
    
    path('api/forgotPassword/', forgot_password, name='forgotPassword'),
    
    path(
        'api/passwordReset/<str:uidb64>/<str:token>/',
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm"
    ),
    
    path(
        'api/verifyEmail/',
        verifyEmail,
        name="email-verification"
    ),
]
