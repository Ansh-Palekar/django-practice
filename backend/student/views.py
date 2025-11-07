from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Student


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
    return Response({"message":"Form Submitted"})