from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
@api_view(["POST"])
def loginTeacher(request):
    gmail=request.data.get("gmail")
    password=request.data.get("password")

    return Response({"message":"Teacher login"})