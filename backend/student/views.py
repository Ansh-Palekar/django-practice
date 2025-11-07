from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.

@api_view(["GET"])
def check(request):
    return Response({"message":"I am Ansh"})


#Login Student
@api_view(["POST"]) 
def loginStudent(request):
    if(request.data.get("username")=="Ansh" and request.data.get("password")=="Palekar"):
        return Response({"status":"Passed"})

    return Response({"status":"Failed"})
