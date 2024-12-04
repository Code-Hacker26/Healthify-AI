from django.urls import path
from .views import post_feedback, get_feedback

urlpatterns = [
    path('feedback/', post_feedback, name='post_feedback'),
    path('feedback/all/', get_feedback, name='get_feedback'),
]
