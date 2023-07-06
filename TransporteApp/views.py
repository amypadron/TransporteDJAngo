
from django.shortcuts import get_object_or_404, redirect
from django.shortcuts import render, get_object_or_404
from .models import Trabajador, Chofer, Administrativo
from .form import TrabajadorForm, ViajeForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import Camion
from .models import Viaje
from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Trabajador, User, Administrativo, Chofer, Viaje, ViajeInterprovincial, Chofer, Camion
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import *


#--------------------------api de user-----------------------

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def user_create(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def user_update(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def user_delete(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


#--------------------------api de trabajador-----------------------
@api_view(['GET'])
def trabajador_list(request):
    trabajadores = Trabajador.objects.all()
    serializer = TrabajadorSerializer(trabajadores, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def trabajador_detail(request, trabajador_id):
    trabajador = get_object_or_404(Trabajador, id=trabajador_id)
    serializer = TrabajadorSerializer(trabajador)
    return Response(serializer.data)


@api_view(['POST'])
def trabajador_create(request):
    print(request.data)
    serializer = TrabajadorSerializer(data=request.data)
    print(serializer._errors)
    if serializer.is_valid():
        user_data = serializer.validated_data.get('user')
        user = User.objects.create(
            usuario=user_data['usuario'], password=user_data['password'])

        administrativo_data = serializer.validated_data.get('administrativo')
        chofer_data = serializer.validated_data.get('chofer')

        trabajador = Trabajador.objects.create(
            ci=serializer.validated_data['ci'],
            sexo=serializer.validated_data['sexo'],
            telefono=serializer.validated_data['telefono'],
            direccion_particular=serializer.validated_data['direccion_particular'],
            nombre=serializer.validated_data['nombre'],
            anios_experiencia=serializer.validated_data['anios_experiencia'],
            nivel_escolar=serializer.validated_data['nivel_escolar'],
            salario_basico=serializer.validated_data['salario_basico'],
            user=user
        )

        if administrativo_data:
            administrativo = Administrativo.objects.create(
                cargo=administrativo_data['cargo'],
                trabajador=trabajador
            )
            trabajador.administrativo = administrativo

        if chofer_data:
            chofer = Chofer.objects.create(
                tipo=chofer_data['tipo'],
                cantidad_viajes=chofer_data['cantidad_viajes'],
                evaluacion_mensual=chofer_data['evaluacion_mensual'],
                trabajador=trabajador
            )
            trabajador.chofer = chofer

        trabajador.save()

        return Response(TrabajadorSerializer(trabajador).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def trabajador_update(request, pk):
    trabajador = get_object_or_404(Trabajador, pk=pk)
    serializer = TrabajadorSerializer(trabajador, data=request.data)
    if serializer.is_valid():
        user_data = serializer.validated_data['user']
        user = trabajador.user
        user.usuario = user_data['usuario']
        user.password = user_data['password']
        user.save()

        administrativo_data = serializer.validated_data.get('administrativo')
        chofer_data = serializer.validated_data.get('chofer')

        if administrativo_data:
            if trabajador.administrativo:
                trabajador.administrativo.cargo = administrativo_data['cargo']
                trabajador.administrativo.save()
            else:
                administrativo = Administrativo.objects.create(
                    cargo=administrativo_data['cargo'],
                    trabajador=trabajador
                )
                trabajador.administrativo = administrativo
        else:
            if trabajador.administrativo:
                trabajador.administrativo.delete()
                trabajador.administrativo = None

        if chofer_data:
            if trabajador.chofer:
                trabajador.chofer.tipo = chofer_data['tipo']
                trabajador.chofer.cantidad_viajes = chofer_data['cantidad_viajes']
                trabajador.chofer.evaluacion_mensual = chofer_data['evaluacion_mensual']
                trabajador.chofer.save()
            else:
                chofer = Chofer.objects.create(
                    tipo=chofer_data['tipo'],
                    cantidad_viajes=chofer_data['cantidad_viajes'],
                    evaluacion_mensual=chofer_data['evaluacion_mensual'],
                    trabajador=trabajador
                )
                trabajador.chofer = chofer
        else:
            if trabajador.chofer:
                trabajador.chofer.delete()
                trabajador.chofer = None

        trabajador.ci = serializer.validated_data['ci']
        trabajador.sexo = serializer.validated_data['sexo']
        trabajador.telefono = serializer.validated_data['telefono']
        trabajador.direccion_particular = serializer.validated_data['direccion_particular']
        trabajador.nombre = serializer.validated_data['nombre']
        trabajador.anios_experiencia = serializer.validated_data['anios_experiencia']
        trabajador.nivel_escolar = serializer.validated_data['nivel_escolar']
        trabajador.salario_basico = serializer.validated_data['salario_basico']
        trabajador.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def trabajador_delete(request, pk):
    trabajador = get_object_or_404(Trabajador, pk=pk)
    trabajador.user.delete()

    if trabajador.administrativo:
        trabajador.administrativo.delete()

    if trabajador.chofer:
        trabajador.chofer.delete()

    trabajador.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



#--------------------------api de viaje-----------------------

@api_view(['GET'])
def viaje_list(request):
    viajes = Viaje.objects.all()
    serializer = ViajeSerializer(viajes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def viaje_detail(request, pk):
    try:
        viaje = Viaje.objects.get(pk=pk)
    except Viaje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ViajeSerializer(viaje)
    return Response(serializer.data)

@api_view(['POST'])
def viaje_create(request):
    serializer = ViajeSerializer(data=request.data)
    if serializer.is_valid():
        chofer_data = serializer.validated_data['chofer']
        camion_data = serializer.validated_data['camion']
        viaje = Viaje.objects.create(
            carga_transportada=serializer.validated_data['carga_transportada'],
            km_recorrido=serializer.validated_data['km_recorrido'],
            dia_semana=serializer.validated_data['dia_semana'],
            chofer=Chofer.objects.get(pk=chofer_data['id']),
            camion=Camion.objects.get(pk=camion_data['id'])
        )
        
        viaje_interprovincial_data = serializer.validated_data.get('viaje_interprovincial')
        if viaje_interprovincial_data:
            ViajeInterprovincial.objects.create(
                provincias_recorridas=viaje_interprovincial_data['provincias_recorridas'],
                dia_regreso=viaje_interprovincial_data['dia_regreso'],
                viaje=viaje
            )

        return Response(ViajeSerializer(viaje).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def viaje_update(request, pk):
    try:
        viaje = Viaje.objects.get(pk=pk)
    except Viaje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ViajeSerializer(viaje, data=request.data)
    if serializer.is_valid():
        chofer_data = serializer.validated_data['chofer']
        camion_data = serializer.validated_data['camion']
        viaje.carga_transportada = serializer.validated_data['carga_transportada']
        viaje.km_recorrido = serializer.validated_data['km_recorrido']
        viaje.dia_semana = serializer.validated_data['dia_semana']
        viaje.chofer = Chofer.objects.get(pk=chofer_data['id'])
        viaje.camion = Camion.objects.get(pk=camion_data['id'])
        
        viaje_interprovincial_data = serializer.validated_data.get('viaje_interprovincial')
        if viaje_interprovincial_data:
            if viaje.viaje_interprovincial:
                viaje_interprovincial = viaje.viaje_interprovincial
                viaje_interprovincial.provincias_recorridas = viaje_interprovincial_data['provincias_recorridas']
                viaje_interprovincial.dia_regreso = viaje_interprovincial_data['dia_regreso']
                viaje_interprovincial.save()
            else:
                viaje_interprovincial = ViajeInterprovincial.objects.create(
                    provincias_recorridas=viaje_interprovincial_data['provincias_recorridas'],
                    dia_regreso=viaje_interprovincial_data['dia_regreso'],
                    viaje=viaje
                )
                viaje.viaje_interprovincial = viaje_interprovincial
        else:
            if viaje.viaje_interprovincial:
                viaje.viaje_interprovincial.delete()
                viaje.viaje_interprovincial = None

        viaje.save()

        return Response(ViajeSerializer(viaje).data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def viaje_delete(request, pk):
    try:
        viaje = Viaje.objects.get(pk=pk)
    except Viaje.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    viaje.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



#--------------------------api de camion-----------------------

@api_view(['GET'])
def camion_list(request):
    camiones = Camion.objects.all()
    serializer = CamionSerializerFull(camiones, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def camion_detail(request, pk):
    try:
        camion = Camion.objects.get(pk=pk)
    except Camion.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CamionSerializer(camion)
    return Response(serializer.data)

@api_view(['POST'])
def camion_create(request):
    serializer = CamionSerializer(data=request.data)
    
    if serializer.is_valid():
        camion = serializer.save()  # Guarda el objeto Camion y las relaciones asociadas

        # Si hay datos para el objeto Antiguo, crea y guarda el objeto Antiguo asociado
        antiguo_data = serializer.validated_data.get('antiguo')
        if antiguo_data:
            antiguo_serializer = AntiguoSerializer(data=antiguo_data)
            print(antiguo_data)
            if antiguo_serializer.is_valid():
                antiguo_serializer.save(camion=camion)
                
            else:
                print(antiguo_serializer)
                return Response(antiguo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Si hay datos para el objeto Moderno, crea y guarda el objeto Moderno asociado
        moderno_data = serializer.validated_data.get('moderno')
        if moderno_data:
            moderno_serializer = ModernoSerializer(data=moderno_data)
            if moderno_serializer.is_valid():
                moderno_serializer.save(camion=camion)
            else:
                return Response(moderno_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def camion_update(request, pk):
    try:
        camion = Camion.objects.get(pk=pk)
    except Camion.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CamionSerializer(camion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def camion_delete(request, pk):
    try:
        camion = Camion.objects.get(pk=pk)
    except Camion.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    camion.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def camion_antiguo_detail(request, pk):
    try:
        camion_antiguo = Antiguo.objects.get(camion=pk)
    except Antiguo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AntiguoSerializer(camion_antiguo)
    return Response(serializer.data)

@api_view(['GET'])
def camion_moderno_detail(request, pk):
    try:
        camion_moderno = Moderno.objects.get(camion=pk)
    except Moderno.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ModernoSerializer(camion_moderno)
    return Response(serializer.data)

# ------------------------------------------------------------------


