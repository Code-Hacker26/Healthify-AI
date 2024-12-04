from rest_framework import serializers
from .models import patient, doctor
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  User
        fields = ('pk', 'username', 'email', )

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = patient
        fields = ['pk', 'user', 'is_patient', 'is_doctor', 'name', 'dob', 'address', 'mobile_no', 'gender', 'about_me']


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = doctor
        fields = ['pk', 'user', 'is_patient', 'is_doctor', 'name', 'dob', 'address', 'mobile_no', 'gender',
                  'registration_no', 'year_of_registration', 'qualification', 'State_Medical_Council', 
                  'specialization', 'rating', 'about_me']