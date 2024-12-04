from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.contrib.auth.models import User
from .models import  diseaseinfo, consultation, rating_review
from chats.models import Feedback, Chat
from accounts.models import doctor, patient
from .serializers import ConsultationSerializer, RatingReviewSerializer,UserSerializer,DiseaseInfoSerializer
from accounts.serializers import DoctorSerializer
from chats.serializers import ChatSerializer
from django.shortcuts import get_object_or_404

from rest_framework import generics

# Assuming you already have your trained model loaded somewhere, example:
# from your_ml_model import model




import joblib
from datetime import date


# Load trained_model
model = joblib.load('trained_model')


@api_view(['GET'])
def home(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return Response({"message": "Welcome to the homepage!"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Please log in."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST'])
def admin_ui(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            auser = request.user
            feedback_objects = Feedback.objects.all()
            feedback_data = [{"id": f.id, "feedback": f.text} for f in feedback_objects]  # Example format
            return Response({
                "auser": auser.username,
                "feedback": feedback_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        # Handle POST request if needed, for now, send a placeholder response
        return Response({"message": "POST request received"}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def patient_ui(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            patient_username = request.session.get('patientusername', None)
            if patient_username:
                try:
                    puser = User.objects.get(username=patient_username)
                    return Response({"puser": {"username": puser.username, "email": puser.email}}, status=status.HTTP_200_OK)
                except User.DoesNotExist:
                    return Response({"message": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"message": "Patient username not found in session"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        # Handle POST request, for now, return a placeholder response
        return Response({"message": "POST request received"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def pviewprofile(request, patientusername):
    if request.method == 'GET':
        try:
            puser = User.objects.get(username=patientusername)
            # You can return only the necessary user info for the frontend
            user_data = {
                "username": puser.username,
                "email": puser.email,
                # Add any other fields you may need
            }
            return Response({"puser": user_data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)



class PatientConsultationHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        patientusername = request.session.get('patientusername')
        if not patientusername:
            return Response({'detail': 'Patient not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            puser = User.objects.get(username=patientusername)
            patient_obj = puser.patient
            consultation_records = consultation.objects.filter(patient=patient_obj)
            serializer = ConsultationSerializer(consultation_records, many=True)
            return Response({'consultation': serializer.data})
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class DoctorConsultationHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        doctorusername = request.session.get('doctorusername')
        if not doctorusername:
            return Response({'detail': 'Doctor not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            duser = User.objects.get(username=doctorusername)
            doctor_obj = duser.doctor
            consultation_records = consultation.objects.filter(doctor=doctor_obj)
            serializer = ConsultationSerializer(consultation_records, many=True)
            return Response({'consultation': serializer.data})
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class DoctorUIView(APIView):
    def get(self, request, *args, **kwargs):
        doctorid = request.session.get('doctorusername')
        if not doctorid:
            return Response({'detail': 'Doctor not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            duser = User.objects.get(username=doctorid)
            serializer = UserSerializer(duser)
            return Response({'duser': serializer.data})
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)



class DoctorProfileView(APIView):
    def get(self, request, doctorusername, *args, **kwargs):
        try:
            duser = User.objects.get(username=doctorusername)
            ratings = rating_review.objects.filter(doctor=duser.doctor)
            user_serializer = UserSerializer(duser)
            rating_serializer = RatingReviewSerializer(ratings, many=True)
            return Response({"duser": user_serializer.data, "rate": rating_serializer.data})
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class ConsultADoctorView(APIView):
    def get(self, request, *args, **kwargs):
        doctortype = request.session.get('doctortype')
        if not doctortype:
            return Response({'detail': 'Doctor type not specified'}, status=status.HTTP_400_BAD_REQUEST)

        doctors = doctor.objects.all()
        doctor_serializer = DoctorSerializer(doctors, many=True)
        return Response({"dobj": doctor_serializer.data})

class MakeConsultationView(APIView):
    def post(self, request, pk, *args, **kwargs):
        try:
            patient_obj = get_object_or_404(patient, user=request.user)
            doctor_obj = get_object_or_404(doctor, pk=pk)
            diseaseinfo_id = request.data.get('disease_info')
            diseaseinfo_obj = get_object_or_404(diseaseinfo, pk=diseaseinfo_id)

            consultation_date = request.data.get('consultation_date')
            report_file = request.FILES.get('report')
            disease_status = "active"

            if consultation.objects.filter(diseaseinfo=diseaseinfo_obj).exists():
                return Response({'detail': 'Consultation with this disease info already exists'}, status=status.HTTP_409_CONFLICT)

            consultation_new = consultation(
                patient=patient_obj, 
                doctor=doctor_obj, 
                diseaseinfo=diseaseinfo_obj, 
                consultation_date=consultation_date, 
                status=disease_status,
                report=report_file
            )
            consultation_new.save()

            return Response({"message": "Consultation record saved successfully", "consultation_id": consultation_new.id})
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except diseaseinfo.DoesNotExist:
            return Response({'detail': 'Disease info not found'}, status=status.HTTP_404_NOT_FOUND)



class ConsultationView(APIView):
    def get(self, request, consultation_id, *args, **kwargs):
        try:
            consultation_obj = consultation.objects.get(id=consultation_id)
            serializer = ConsultationSerializer(consultation_obj)
            return Response({"consultation": serializer.data})
        except consultation.DoesNotExist:
            return Response({'detail': 'Consultation not found'}, status=status.HTTP_404_NOT_FOUND)

class RateReviewView(APIView):
    def post(self, request, consultation_id, *args, **kwargs):
        try:
            consultation_obj = consultation.objects.get(id=consultation_id)
            patient = consultation_obj.patient
            doctor = consultation_obj.doctor
            rating = request.data.get('rating')
            review = request.data.get('review')

            rating_obj = rating_review(patient=patient, doctor=doctor, rating=rating, review=review)
            rating_obj.save()

            # Update doctor rating (assuming doctor has a 'rating' field)
            doctor.rating = int(rating)
            doctor.save()

            return Response({'detail': 'Rating and review saved successfully'}, status=status.HTTP_201_CREATED)
        except consultation.DoesNotExist:
            return Response({'detail': 'Consultation not found'}, status=status.HTTP_404_NOT_FOUND)

class CloseConsultationView(APIView):
    def post(self, request, consultation_id, *args, **kwargs):
        try:
            consultation_obj = consultation.objects.get(id=consultation_id)
            consultation_obj.status = 'closed'
            consultation_obj.save()
            return Response({'detail': 'Consultation closed successfully'}, status=status.HTTP_200_OK)
        except consultation.DoesNotExist:
            return Response({'detail': 'Consultation not found'}, status=status.HTTP_404_NOT_FOUND)

class PostChatView(APIView):
    def post(self, request, *args, **kwargs):
        msg = request.data.get('msgbox', None)
        consultation_id = request.session.get('consultation_id')

        if not consultation_id:
            return Response({'detail': 'Consultation ID not found in session'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            consultation_obj = consultation.objects.get(id=consultation_id)
            chat_obj = Chat(consultation_id=consultation_obj, sender=request.user, message=msg)
            if msg:
                chat_obj.save()
                return Response({'msg': msg})
            else:
                return Response({'detail': 'Message cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
        except consultation.DoesNotExist:
            return Response({'detail': 'Consultation not found'}, status=status.HTTP_404_NOT_FOUND)

class ChatMessagesView(APIView):
    def get(self, request, *args, **kwargs):
        consultation_id = request.session.get('consultation_id')
        if not consultation_id:
            return Response({'detail': 'Consultation ID not found in session'}, status=status.HTTP_400_BAD_REQUEST)

        chats = Chat.objects.filter(consultation_id=consultation_id)
        serializer = ChatSerializer(chats, many=True)
        return Response({'chat': serializer.data})
    

class CheckDiseaseView(APIView):
    def get(self, request):
        symptomslist = [
            'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills',
            'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 
            'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
            'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes',
            'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
            'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
            'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes',
            'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 
            'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 
            'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 
            'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 
            'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 
            'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 
            'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 
            'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 
            'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 
            'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 
            'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 
            'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 
            'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 
            'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 
            'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
        ]
        alphabaticsymptomslist = sorted(symptomslist)
        return Response({'list2': alphabaticsymptomslist}, status=status.HTTP_200_OK)

    def post(self, request):
        inputno = int(request.data.get('noofsym', 0))
        # if inputno == 0:
        #     return Response({'predicteddisease': "none", 'confidencescore': 0}, status=status.HTTP_200_OK)

        psymptoms = request.data.getlist('symptoms[]', [])
        # print(request.user, "==")
        symptomslist = [
            'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills',
            'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 
            'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
            'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes',
            'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
            'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
            'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes',
            'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 
            'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 
            'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 
            'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 
            'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 
            'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 
            'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 
            'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 
            'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 
            'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 
            'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 
            'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 
            'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 
            'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 
            'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
        ]

        

        testingsymptoms = [0] * len(symptomslist)
        for k, symptom in enumerate(symptomslist):
            if symptom in psymptoms:
                testingsymptoms[k] = 1

        inputtest = [testingsymptoms]

        # Assuming model is defined somewhere else in your project
        predicted = model.predict(inputtest)
        y_pred_2 = model.predict_proba(inputtest)
        confidencescore = y_pred_2.max() * 100
        confidencescore = format(confidencescore, '.0f')
        predicted_disease = predicted[0]

        doctor_specializations = {
            'Rheumatologist': ['Osteoarthristis', 'Arthritis'],
            'Cardiologist': ['Heart attack', 'Bronchial Asthma', 'Hypertension '],
            'ENT specialist': ['(vertigo) Paroymsal Positional Vertigo', 'Hypothyroidism'],
            'Neurologist': ['Varicose veins', 'Paralysis (brain hemorrhage)', 'Migraine', 'Cervical spondylosis'],
            'Allergist/Immunologist': ['Allergy', 'Pneumonia', 'AIDS', 'Common Cold', 'Tuberculosis', 'Malaria', 'Dengue', 'Typhoid'],
            'Urologist': ['Urinary tract infection', 'Dimorphic hemmorhoids(piles)'],
            'Dermatologist': ['Acne', 'Chicken pox', 'Fungal infection', 'Psoriasis', 'Impetigo'],
            'Gastroenterologist': ['Peptic ulcer diseae', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 'Gastroenteritis', 
                                   'Hepatitis E', 'Alcoholic hepatitis', 'Jaundice', 'hepatitis A', 'Hepatitis B', 
                                   'Hepatitis C', 'Hepatitis D', 'Diabetes ', 'Hypoglycemia']
        }

        consultdoctor = next(
            (specialist for specialist, diseases in doctor_specializations.items() if predicted_disease in diseases), 'other'
        )

        request.session['doctortype'] = consultdoctor

        # patientusername = request.session.get('patientusername')
        # puser = get_object_or_404(User, username=request.user.username)
        puser = get_object_or_404(patient, user=request.user)

        # puser = request.user

        # Saving disease info in the database
        # patient = puser.patient
        diseaseinfo_new = diseaseinfo(
            patient=puser,
            diseasename=predicted_disease,
            no_of_symp=inputno,
            symptomsname=psymptoms,
            confidence=confidencescore,
            consultdoctor=consultdoctor
        )
        diseaseinfo_new.save()

        request.session['diseaseinfo_id'] = diseaseinfo_new.id

        return Response({
            'predicteddisease': predicted_disease, 
            'confidencescore': confidencescore, 
            'consultdoctor': consultdoctor,
            'disease_info': diseaseinfo_new.pk,
            'patient': {
                'name': puser.name,
                'age': puser.age
            }
        }, status=status.HTTP_200_OK)










####################
from django_filters import rest_framework as filters
from accounts.serializers import PatientSerializer, DoctorSerializer


class DoctorFilter(filters.FilterSet):
    specialization = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = doctor
        fields = ['specialization']


class DoctorListView(generics.ListAPIView):
    serializer_class = DoctorSerializer
    queryset = doctor.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = DoctorFilter



class PatientDetailsView(generics.RetrieveAPIView):
    serializer_class = PatientSerializer
    queryset = patient.objects.all()


class DoctorDetailsView(generics.RetrieveAPIView):
    serializer_class = DoctorSerializer
    queryset = doctor.objects.all()


class PatientConsultationListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        return consultation.objects.filter(patient__user=self.request.user)


class DoctorConsultationListView(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        return consultation.objects.filter(doctor__user=self.request.user)