# Generated by Django 5.1 on 2024-09-08 08:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='doctor',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('is_patient', models.BooleanField(default=False)),
                ('is_doctor', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=50)),
                ('dob', models.DateField()),
                ('address', models.CharField(max_length=100)),
                ('mobile_no', models.CharField(max_length=15)),
                ('gender', models.CharField(max_length=10)),
                ('registration_no', models.CharField(max_length=20)),
                ('year_of_registration', models.DateField()),
                ('qualification', models.CharField(max_length=20)),
                ('State_Medical_Council', models.CharField(max_length=30)),
                ('specialization', models.CharField(max_length=30)),
                ('rating', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='patient',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('is_patient', models.BooleanField(default=True)),
                ('is_doctor', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=50)),
                ('dob', models.DateField()),
                ('address', models.CharField(max_length=100)),
                ('mobile_no', models.CharField(max_length=15)),
                ('gender', models.CharField(max_length=10)),
            ],
        ),
    ]
