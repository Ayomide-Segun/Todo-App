from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics, viewsets, status
from todoapp.models import Todos, CheckIns, ChatMessage
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from .serializers import TodosSerializer, CheckInsSerializer, ChatMessageSerializer, RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from .utils import get_gemini_response, generate_otp
from django.core.cache import cache

class TodoListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = TodosSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Todos.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoDetailsAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodosSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        # Ensure only the owner can access/update/delete
        return Todos.objects.filter(user=self.request.user)
    
class CheckInsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CheckInsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return CheckIns.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_checkIns(request, pk):
    try:
        CheckIns.objects.filter(todo=pk, user=request.user).delete()
    except CheckIns.DoesNotExist:
        return Response({"error": "Todo not found for this user"}, status=404)
    return Response({"message": "Deleted successfully"}, status=204)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_chat_message(request, pk):
    try:
        ChatMessage.objects.filter(project_id=pk).delete()
    except ChatMessage.DoesNotExist:
        return Response({"error": "Chat message not found for this user"}, status=404)
    return Response({"message": "Deleted successfully"}, status=204)

class PromptResponseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')
        if project_id:
            return ChatMessage.objects.filter(project_id=project_id, user=self.request.user)
        return ChatMessage.objects.none()
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

@api_view(['POST'])
def ai_assistant(request):
    user_message = request.data.get("user_prompt")
    raw_user_text = request.data.get("userText")
    project_id = request.data.get("project_id")
    
    if not user_message or not project_id:
        return Response({"error": "Prompt and Project name is required"}, status=400)
    
    # GenAI response
    ai_reply= get_gemini_response(user_message)
    
    return Response({
        "user_prompt": raw_user_text,
        "ai_response": ai_reply,
        "project_id" : project_id
    })
    
class RegisterView(APIView):
    def post(self, request):
        email = request.POST.get("email")
        otp_input = request.POST.get("otp")

        cached_otp = cache.get(f"otp_{email}")

        if cached_otp is None: 
            return Response({"error": "Verification code expired or invalid"}, status=400)

        if str(cached_otp) != str(otp_input):
            return Response({"error": "Incorrect verification code"}, status=400)

        cache.delete(f"otp_{email}")  # one-time use 

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created"}, status=201)
        return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def verifyEmail(request):
    email = request.data.get("email")
    if not email :
        return Response(
            {"error": "Email is required"},
            status=400
        )
        
    otp = generate_otp()
    cached_otp = cache.set(f"otp_{email}", otp, timeout=300)
    
    verification_link = f"http://task-management-app-virid.vercel.app/verifyEmail"
    try:
        send_mail(
            "Email verification",
            f"Verification code: {otp} \nClick the link to reset your password: {verification_link}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False
        )
    except Exception as e:
        return Response({"error": "Email failed to send"}, status=500)
    return Response(
        {"message": "OTP sent successfully"},
        status=200
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get("email")  # username OR email
    try:
        user = User.objects.filter(email=email).first()
    except User.DoesNotExist:
        # IMPORTANT: same response no matter what
        return Response({
            "error": "User not found"
        })
        
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    reset_link = f"http://task-management-app-virid.vercel.app/passwordReset/{uid}/{token}"
    
    send_mail(
        "Password Reset",
        f"Click the link to reset your password: {reset_link}",
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    
    return Response({
        "message": "If the account exists, a reset link has been- sent."
    })
    
class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            # Decode user id
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except:
            return Response(
                {"error": "Invalid reset link"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check token
        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return Response(
                {"error": "Token is invalid or expired"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Get new password
        password = request.data.get("password")

        if not password:
            return Response(
                {"error": "Password is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set new password
        user.set_password(password)
        user.save()

        return Response(
            {"message": "Password reset successful"},
            status=status.HTTP_200_OK
        )