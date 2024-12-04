from django.urls import path
from .views import (
    logout_view, sign_in_admin, signup_patient, sign_in_patient,
    save_patient_data, signup_doctor, sign_in_doctor, save_doctor_data, user_details
)

urlpatterns = [
    path('logout/', logout_view, name='logout'),
    path('sign-in-admin/', sign_in_admin, name='sign_in_admin'),
    path('signup-patient/', signup_patient, name='signup_patient'),
    path('sign-in-patient/', sign_in_patient, name='sign_in_patient'),
    path('save-patient-data/<str:patientusername>/', save_patient_data, name='save_patient_data'),
    path('signup-doctor/', signup_doctor, name='signup_doctor'),
    path('sign-in-doctor/', sign_in_doctor, name='sign_in_doctor'),
    path('save-doctor-data/<str:doctorusername>/', save_doctor_data, name='save_doctor_data'),

    path('user-details/', user_details, name='user_details'),
]
