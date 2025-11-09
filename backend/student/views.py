from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from .models import Student
from teacher.models import Teacher
from teacher.serializer import TeacherSerializer,EventSerializer

# Create your views here.
@api_view(["GET"])
def check(request):
    return Response({"message":"I am Ansh"})


#Login Student
@api_view(["POST"]) 
def loginStudent(request):

    gmail=request.data.get("gmail")
    password=request.data.get("password")

    try:
        student_obj=Student.objects.get(gmail=gmail)
    except:
        return Response({"message":"User Not Found"})
    
   
    if student_obj.gmail==gmail and student_obj.password==password:
        return Response({"message":"Login SuccesFull"})
    
    return Response({"message":"Failed"})




@api_view(["POST"])
def submitForm(request):
    division=request.data.get("division")
    event_teacher=request.data.get("event_teacher")
    prn=request.data.get("prn")

    try:
        class_teacher_obj=Teacher.objects.get(division=division)
        event_teacher_obj=Teacher.objects.get(name=event_teacher)    
        student_obj=Student.objects.get(prn=prn)

    except:
        return Response({"message":"Teacher Not Found"})
    
    try:
        serializer=EventSerializer(data={"prn":student_obj.id,"class_teacher":class_teacher_obj.id,"event_teacher":event_teacher_obj.id,"status":"Fail"})

        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

    except:
        return Response({"message":f"{serializer.errors}"})

    return Response({"message":"Form Submitted"})