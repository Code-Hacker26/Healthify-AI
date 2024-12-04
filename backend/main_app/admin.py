from django.contrib import admin
from .models import  diseaseinfo , consultation,rating_review

# Register your models here.
admin.site.register(diseaseinfo)
admin.site.register(consultation)
admin.site.register(rating_review)