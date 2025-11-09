from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from student.models import Student
from .models import Event,Teacher
from .serializer import EventSerializer


# Create your views here.
@api_view(["POST"])
def loginTeacher(request):
    gmail=request.data.get("gmail")
    password=request.data.get("password")

    return Response({"message":"Teacher login"})


@api_view(["GET"])
def fetchForClassTeacher(request):

    student_names=[]
    teacher_division= request.query_params.get("division")

    try:
        teacher_obj=Teacher.objects.get(division=teacher_division)
    except:
        return Response({"message":"Teacher Not Present"})
    
    try:
        event_list=Event.objects.filter(status="Fail",class_teacher=teacher_obj)  #Returns List of Event Objects whose status=Fail
    except Exception as e:
        return Response({"message":f"{e}"})
    
    
    for student in event_list:
        name=student.prn.name
        if name not in student_names:
            print(name)
            student_names.append(name)

    return Response({"student_list":student_names})
