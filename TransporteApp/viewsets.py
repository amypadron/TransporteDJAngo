
from django.shortcuts import get_object_or_404, redirect,render

from .models import *
from .form import TrabajadorForm, ViajeForm
# from django.shortcuts import get_object_or_404, render, redirect
# from .models import Camion,Viaje


from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from .models import Trabajador, User, Administrativo, Chofer, Viaje, ViajeInterprovincial, Chofer, Camion
from rest_framework.decorators import api_view
from .serializer import *


class TrabajadorViewSets(viewsets.ModelViewSet):
    queryset = Trabajador.objects.all()
    serializer_class = TrabajadorSerializer
    