from django.urls import path
from . import views

urlpatterns=[
    path('health_check/',views.check),
    path('get_data/',views.check),
    path('loginStud/',views.loginStudent),
    path('submitForm/',views.submitForm),
]