from django.urls import path
from . import views

urlpatterns=[
    path('loginTeacher/',views.loginTeacher),
    path("fetchForClassTeacher/",views.fetchForClassTeacher),
    path("fetchForEventTeacher/",views.fetchForEventTeacher)
]