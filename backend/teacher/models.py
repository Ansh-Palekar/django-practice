from django.db import models

# Create your models here.
class Teacher(models.Model):
    name=models.CharField(max_length=100)
    division=models.CharField(max_length=100)
    gmail=models.EmailField(max_length=100)
    password=models.CharField(max_length=100)
    
