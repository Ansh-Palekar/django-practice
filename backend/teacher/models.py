from django.db import models
from student.models import Student

# Create your models here.
class Teacher(models.Model):
    name=models.CharField(max_length=100)
    division=models.CharField(max_length=100)
    gmail=models.EmailField(max_length=100)
    password=models.CharField(max_length=100)

class Event(models.Model):
    prn=models.ForeignKey(Student,on_delete=models.CASCADE)
    class_teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="class_teacher")
    event_teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name="event_teacher")
    status=models.CharField(max_length=100)


  


    
