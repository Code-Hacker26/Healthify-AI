from django.urls import path
from . import views
from .views import (
    DoctorConsultationHistoryView,
    DoctorUIView,
    DoctorProfileView,
    ConsultADoctorView,
    MakeConsultationView,
    ConsultationView,
    RateReviewView,
    CloseConsultationView,
    PostChatView,
    ChatMessagesView,
    CheckDiseaseView, 
    PatientConsultationHistoryView
)


urlpatterns = [
    path('', views.home, name='home'),  # URL for the homepage
    path('admin-ui/', views.admin_ui, name='admin_ui'),  # URL for the admin interface
    path('patient-ui/', views.patient_ui, name='patient_ui'),  # URL for the patient interface
    path('patient/<str:patientusername>/profile/', views.pviewprofile, name='pviewprofile'),  # URL to view patient profile
    path('check-disease/', CheckDiseaseView.as_view(), name='check_disease'),  # URL for disease prediction
    path('consultation-history/', PatientConsultationHistoryView.as_view(), name='consultation_history'),  # URL for consultation history
    path('doctor/consultation-history/', DoctorConsultationHistoryView.as_view(), name='doctor-consultation-history'),
    path('doctor/ui/', DoctorUIView.as_view(), name='doctor-ui'),
    path('doctor/profile/<str:doctorusername>/', DoctorProfileView.as_view(), name='doctor-profile'),
    path('consult/doctors/', ConsultADoctorView.as_view(), name='consult-doctors'),
    path('consult/make/<int:pk>/', MakeConsultationView.as_view(), name='make-consultation'),
    path('consultation/<int:consultation_id>/', ConsultationView.as_view(), name='consultation-detail'),
    path('consultation/<int:consultation_id>/rate-review/', RateReviewView.as_view(), name='rate-review'),
    path('consultation/<int:consultation_id>/close/', CloseConsultationView.as_view(), name='close-consultation'),
    path('consultation/chat/', PostChatView.as_view(), name='post-chat'),
    path('consultation/chat/messages/', ChatMessagesView.as_view(), name='chat-messages'),

    ########
    path('doctor-list/', views.DoctorListView.as_view(), name="doctor_list"),
    path('patient/<int:pk>/', views.PatientDetailsView.as_view(), name="patient_details"),
    path('doctor/<int:pk>/', views.DoctorDetailsView.as_view(), name="doctor_details"),
    path('patient/consultation/', views.PatientConsultationListView.as_view(), name="patient_consultation"),
    path('doctor/consultation/', views.DoctorConsultationListView.as_view(), name="doctor_consultation"),
]