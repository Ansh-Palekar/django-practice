from django.db import models

# Create your models here.

class Student(models.Model):
    prn=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    attendance=models.IntegerField()
    gmail=models.EmailField(max_length=100)
    password=models.CharField(max_length=100)
