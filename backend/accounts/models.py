from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

from datetime import date

# Create your models here.

class patient(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
    is_patient = models.BooleanField(default=True)
    is_doctor = models.BooleanField(default=False)

    name = models.CharField(max_length = 50)
    dob = models.DateField(null=True, blank=True)
    address = models.CharField(max_length = 100)
    mobile_no = models.CharField(max_length = 15)
    gender = models.CharField(max_length = 10)
    about_me = models.TextField(null=True, blank=True)

    
    @property
    def age(self):
        today = date.today()
        db = self.dob
        age = today.year - db.year
        if today.month < db.month or (today.month == db.month and today.day < db.day):
            age -= 1
        return age



class doctor(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=True)

    name = models.CharField(max_length=50)
    dob = models.DateField()
    address = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)

    registration_no = models.CharField(max_length=20)
    year_of_registration = models.DateField()
    qualification = models.CharField(max_length=20)
    State_Medical_Council = models.CharField(max_length=30)
    about_me = models.TextField(null=True, blank=True)

    specialization = models.CharField(max_length=30)
    rating = models.IntegerField(default=0)
    fees = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)  

