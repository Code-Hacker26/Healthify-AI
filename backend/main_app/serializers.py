from rest_framework import serializers
from .models import patient, doctor, diseaseinfo, consultation, rating_review
from django.contrib.auth.models import User
from accounts.serializers import PatientSerializer, DoctorSerializer

class DiseaseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = diseaseinfo
        fields = ['patient', 'diseasename', 'no_of_symp', 'symptomsname', 'confidence', 'consultdoctor']

class ConsultationSerializer(serializers.ModelSerializer):
    diseaseinfo = DiseaseInfoSerializer()
    patient = PatientSerializer()
    doctor = DoctorSerializer()
    class Meta:
        model = consultation
        fields = ['pk', 'patient', 'doctor', 'diseaseinfo', 'consultation_date', 'status', 'report']

class RatingReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = rating_review
        fields = ['patient', 'doctor', 'rating', 'review']

    def get_rating_is(self, obj):
        ratings = rating_review.objects.filter(doctor=obj.doctor)
        if ratings:
            return int(sum(r.rating for r in ratings) / len(ratings))
        return 0
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email'] 

class SymptomsSerializer(serializers.Serializer):
    noofsym = serializers.IntegerField()
    symptoms = serializers.ListField(child=serializers.CharField())

class DiseaseInfoSerializer(serializers.Serializer):
    predicteddisease = serializers.CharField()
    confidencescore = serializers.FloatField()
    consultdoctor = serializers.CharField()