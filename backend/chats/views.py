from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Feedback
from .serializers import FeedbackSerializer

@api_view(['POST'])
def post_feedback(request):
    """
    Endpoint to create a new feedback.
    """
    feedback = request.data.get('feedback', None)
    if feedback:
        f = Feedback(sender=request.user, feedback=feedback)
        f.save()
        
        if getattr(request.user, 'patient', None) and request.user.patient.is_patient:
            return Response({"message": "Feedback successfully sent."}, status=status.HTTP_201_CREATED)
        
        if getattr(request.user, 'doctor', None) and request.user.doctor.is_doctor:
            return Response({"message": "Feedback successfully sent."}, status=status.HTTP_201_CREATED)

        return Response({"message": "Feedback successfully sent."}, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Feedback field is empty."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_feedback(request):
    """
    Endpoint to retrieve all feedback.
    """
    feedbacks = Feedback.objects.all()
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
