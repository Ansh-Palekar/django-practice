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
    try:
        teacher_obj=Teacher.objects.get(gmail=gmail,password=password)
        return Response({"message":"SuccessFull","name":teacher_obj.name,"division":teacher_obj.division})
    except Exception as e:
        print(e)
    
    return Response({"message":"Failed"})


@api_view(["GET"])
def fetchForClassTeacher(request):
    student_names=[]
    teacher_name= request.query_params.get("teacher_name")
    try:
        teacher_obj=Teacher.objects.get(name=teacher_name)
    except Exception as e:
        print(e)
        return Response({"message":"Teacher Not Present"})

    try:
        event_list=Event.objects.filter(status="True",class_teacher=teacher_obj)  #Returns List of Event Objects whose status=Fail
    except Exception as e:
        print(e)
        return Response({"message":f"{e}"})

    print(event_list)
    for student in event_list:
        print("inside loop")
        name=student.prn.name
        print(name)
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
        print(student_name)
        student_obj=Student.objects.get(name=student_name)
    
    except Exception as e:
        print("eXCEPTIONS HAI BHAI")
        return Response({"message":f"{e}"})
    
    try:
        event_obj=Event.objects.get(prn=student_obj)

    except Exception as e:
        return Response({"message":f"{e}"})

    student_obj.attendance+=1
    student_obj.save()

    try:
        event_obj.delete()
        print("Object delete")
    except Exception as e:
        return Response({"message":f"{e}"})
    
    return Response({"success":True, "message":"Attendance Marked"})


@api_view(["POST"])
def approveAttendance(request):
    student_name=request.data.get("student_name")
    try:
        print(student_name)
        student_obj=Student.objects.get(name=student_name)
    
    except Exception as e:
        print(e)
        return Response({"message":f"{e}"})
    
    try:
        event_obj=Event.objects.get(prn=student_obj)

    except Exception as e:
        return Response({"message":f"{e}"})
    try:
        event_obj.status="True"
        event_obj.save()
        print("Object SAVED")
    except Exception as e:
        return Response({"message":f"{e}"})
    
    return Response({"success":True, "message":"Attendance Marked"})