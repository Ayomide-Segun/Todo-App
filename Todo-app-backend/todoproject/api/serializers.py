from rest_framework import serializers
from django.contrib.auth.models import User
from todoapp.models import Todos, CheckIns, ChatMessage

class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = '__all__'
        read_only_fields = ["user"]
        
class CheckInsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIns
        fields = '__all__'
        read_only_fields = ["user"]
        
class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
        read_only_fields = ["user"]
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    # 🔒 check username
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    # 🔒 check email
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user