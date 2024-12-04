from rest_framework import serializers
from .models import Chat, Feedback

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'created', 'consultation_id', 'sender', 'message']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'created', 'sender', 'feedback']
