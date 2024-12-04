from django.contrib import admin

# Register your models here.
from .models import patient , doctor 

# Register your models here.

admin.site.register(patient)
admin.site.register(doctor)