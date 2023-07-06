"""
URL configuration for Transporte project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from TransporteApp import views 
from . import views
 
urlpatterns = [
    path('crear-trabajador/', views.trabajador_create, name='crear_trabajador'),
    path('listar-trabajadores/', views.trabajador_list, name='listar_trabajadores'),
    path('trabajador/<str:trabajador_id>/editar/', views.trabajador_update, name='editar-trabajador'),
    path('trabajador/<str:trabajador_id>/eliminar/', views.trabajador_delete, name='eliminar-trabajador'),
    path('trabajador/<str:trabajador_id>/obtener/', views.trabajador_detail, name='obtener-trabajador-id'),
    
    path('crear-usuario/', views.user_create, name='crear-usuario'),
    path('listar-usuario/', views.user_list, name='listar_trabajadores'),
    path('usuario/<str:usuario_id>/editar/', views.user_update, name='editar-usuario'),
    path('usuario/<str:usuario_id>/eliminar/', views.user_delete, name='eliminar-usuario'),
    path('usuario/<str:usuario_id>/obtener/', views.user_detail, name='obtener-usuario-id'),
    
    path('crear-camion/', views.camion_create, name='crear_camion'),
    path('listar-camiones/', views.camion_list, name='listar_camiones'),
    path('camion/<str:camion_id>/editar/', views.camion_update, name='editar_camion'),
    path('camion/<str:camion_id>/eliminar/', views.camion_delete, name='eliminar_camion'),
    path('camion/<str:camion_id>/obtener/', views.camion_detail, name='obtener-camion-id'),
    
    path('crear-viaje/', views.viaje_create, name='crear_viaje'),
    path('listar-viajes/', views.viaje_list, name='listar_viajes'),
    path('viaje/<str:viaje_id>/editar/', views.viaje_update, name='editar_viaje'),
    path('viaje/<str:viaje_id>/eliminar/', views.viaje_delete, name='eliminar_viaje'),
    path('viaje/<str:viaje_id>/obtener/', views.viaje_detail, name='obtener-viaje-id'),






]


    

