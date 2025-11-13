from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from student.models import Student
from .models import Event,Teacher,EventName
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
        event_list=Event.objects.filter(status="Pass",class_teacher=teacher_obj)  #Returns List of Event Objects whose status=Fail
    except Exception as e:
        return Response({"message":f"{e}"})

    for student in event_list:
        name=student.prn.name
        if name not in student_names:
            print(name)
            student_names.append(name)

    return Response({"student_list":student_names})

@api_view(["GET"])
def fetchForEventTeacher(request):
    student_names=[]
    teacher_name=request.query_params.get("teacher_name")
    try:
        teacher_obj=Teacher.objects.get(name=teacher_name)
        event_name_obj=EventName.objects.get(faculty_name=teacher_obj)
        event_name=event_name_obj.event_name

    except Exception as e:
        return Response({"message":f"{e}"})
    
    try:
        event_list=Event.objects.filter(status="Fail",event_name=event_name)
    except Exception as e:
        return Response({"messsage":f"{e}"})
    
    for student in event_list:
        name=student.prn.name
        if name not in student_names:
            student_names.append(name)

    return Response({"student_list":student_names})


@api_view(["POST"])
def approve(request):
    student_name=request.data.get("student_name")
    try:
        student_obj=Student.objects.get(name=student_name)
    except Exception as e:
        return Response({"message":f"{e}"})
            
    try:
        event_obj=Event.objects.get(prn=student_obj)
        event_obj.status="Pass"
        event_obj.save()

    except Exception as e:
        return Response({"message":f"{e}"})    
    return Response({"message":"Student Approved"})

@api_view(["POST"])
def markAttendance(request):
    student_name=request.data.get("student_name")
    try:
        student_obj=Student.objects.get(name=student_name)
    except Exception as e:
        return Response({"message":f"{e}"})
    
    try:
        event_obj=Event.objects.get(prn=student_obj)

    except Exception as e:
        return Response({"message":f"{e}"})

    student_obj.attendance+=1
    student_obj.save()
    '''
    try:
        event_obj.delete()
    except Exception as e:
        return Response({"message":f"{e}"})
    '''

    
    return Response({"message":"Attendance Marked"})