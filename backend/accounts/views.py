from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import logout,authenticate, login
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from .models import patient,doctor
from .serializers import PatientSerializer,DoctorSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny



@api_view(['POST'])
def logout_view(request):
    """
    Endpoint to logout a user.
    """
    logout(request)
    request.session.flush()  # Clears the session data.
    return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

@api_view(['POST'])
def sign_in_admin(request):
    """
    Endpoint to sign in an admin user.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_superuser:
        login(request, user)
        return Response({"message": "Admin logged in successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials or not an admin."}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def signup_patient(request):
    """
    Endpoint to sign up a new patient user.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    name = request.data.get('name')
    dob = request.data.get('dob')
    gender = request.data.get('gender')
    address = request.data.get('address')
    mobile_no = request.data.get('mobile')
    password = request.data.get('password')
    password1 = request.data.get('password1')
    
    # Check if Google Sign-In is used
    is_google_sign_in = request.data.get('isGoogleSignIn', False)

    # Validation when not using Google Sign-In
    if not is_google_sign_in:
        if not all([username, email, name, dob, gender, address, mobile_no, password, password1]):
            raise ValidationError("Please ensure all required fields are filled out.")

        if password != password1:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    # Validation when using Google Sign-In (address, mobile, and password are not required)
    else:
        if not all([username, email, name]):
            raise ValidationError("Please ensure all required fields are filled out for Google sign-in.")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    user = User.objects.create_user(
        username=username,
        password=password if not is_google_sign_in else None,  # Password is not needed for Google Sign-In
        email=email
    )
    user.save()

    # Create patient record
    patientnew = patient(
        user=user,
        name=name,
        dob=dob if not is_google_sign_in else None,
        gender=gender if not is_google_sign_in else '',
        address=address if not is_google_sign_in else '',  # Address is optional for Google sign-in
        mobile_no=mobile_no if not is_google_sign_in else ''  # Mobile number is optional for Google sign-in
    )
    patientnew.save()

    return Response({"message": "Patient created successfully."}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def sign_in_patient(request):
    """
    Endpoint to sign in a patient user.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    is_google_sign_in = request.data.get('isGoogleSignIn', False)

    if is_google_sign_in:
        user = User.objects.filter(username=username).first()  # Fetch user by username
        if user and getattr(user, 'patient', None) and user.patient.is_patient:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            token_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'pk': user.pk,
                    'username': user.username,
                    'email': user.email,
                    'is_patient': user.patient.is_patient,
                    'patient': {
                        'pk': user.patient.pk,
                        'name': user.patient.name
                    }
                }
            }
            return Response({
                "message": "Patient logged in successfully.",
                "token": token_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials or not a patient."}, status=status.HTTP_400_BAD_REQUEST)

    # Regular login logic for non-Google sign-in
    user = authenticate(username=username, password=password)
    if user is not None and getattr(user, 'patient', None) and user.patient.is_patient:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'pk': user.pk,
                'username': user.username,
                'email': user.email,
                'is_patient': user.patient.is_patient,
                'patient': {
                    'pk': user.patient.pk,
                    'name': user.patient.name
                }
            }
        }
        return Response({
            "message": "Patient logged in successfully.",
            "token": token_data
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials or not a patient."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def save_patient_data(request, patientusername):
    """
    Endpoint to update patient details.
    """
    try:
        puser = User.objects.get(username=patientusername)
        patient_instance = puser.patient
    except patient.DoesNotExist:
        return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = PatientSerializer(patient_instance, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def signup_doctor(request):
    """
    Endpoint to sign up a new doctor user.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    name = request.data.get('name')
    dob = request.data.get('dob')
    gender = request.data.get('gender')
    address = request.data.get('address')
    mobile_no = request.data.get('mobile')
    registration_no = request.data.get('registration_no')
    year_of_registration = request.data.get('year_of_registration')
    qualification = request.data.get('qualification')
    State_Medical_Council = request.data.get('State_Medical_Council')
    specialization = request.data.get('specialization')
    password = request.data.get('password')
    password1 = request.data.get('password1')

    if not all([username, email, name, dob, gender, address, mobile_no, registration_no,
                year_of_registration, qualification, State_Medical_Council, specialization, password, password1]):
        raise ValidationError("Please ensure all required fields are filled out.")

    if password != password1:
        return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already taken."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()

    doctornew = doctor(user=user, name=name, dob=dob, gender=gender, address=address, mobile_no=mobile_no,
                       registration_no=registration_no, year_of_registration=year_of_registration,
                       qualification=qualification, State_Medical_Council=State_Medical_Council, specialization=specialization)
    doctornew.save()

    return Response({"message": "Doctor created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def sign_in_doctor(request):
    """
    Endpoint to sign in a doctor user.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and getattr(user, 'doctor', None) and user.doctor.is_doctor:
        login(request, user)

        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'pk': user.pk,
                'username': user.username,
                'email': user.email,
                'is_doctor': user.doctor.is_doctor,
                'doctor': {
                    'pk': user.doctor.pk,
                    'name': user.doctor.name
                }
            }
        }

        return Response({
            "message": "Doctor logged in successfully.",
            "token": token_data
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials or not a doctor."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def save_doctor_data(request, doctorusername):
    """
    Endpoint to update doctor details.
    """
    try:
        duser = User.objects.get(username=doctorusername)
        doctor_instance = duser.doctor
    except doctor.DoesNotExist:
        return Response({"error": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctor_instance, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_details(request):
    user = request.user

    token_data = {
        'refresh': '',
        'access': '',
        'user': {
            'pk': user.pk,
            'username': user.username,
            'email': user.email
        }
    }

    if hasattr(user, 'patient') and user.patient.is_patient:
        token_data['user']['is_patient'] = True
        token_data['user']['patient'] = {
            'pk': user.patient.pk,
            'name': user.patient.name
        }
        message = "Patient logged in successfully."
    
    elif hasattr(user, 'doctor') and user.doctor.is_doctor:
        token_data['user']['is_doctor'] = True
        token_data['user']['doctor'] = {
            'pk': user.doctor.pk,
            'name': user.doctor.name
        }
        message = "Doctor logged in successfully."

    else:
        return Response({
            "message": "User is neither a patient nor a doctor.",
        }, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        "message": message,
        "token": token_data
    }, status=status.HTTP_200_OK)