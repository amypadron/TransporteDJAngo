from rest_framework import serializers
from .models import User, Trabajador, Camion, Moderno, Antiguo, Chofer, Administrativo, Viaje, ViajeInterprovincial, NominaSalario

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = '__all__'

class ChoferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chofer
        fields = '__all__'
        
class TrabajadorSerializer(serializers.ModelSerializer):
    administrativo = AdministrativoSerializer(required=False)
    chofer = ChoferSerializer(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Trabajador
        fields = '__all__'


class ModernoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderno
        fields = '__all__'

class AntiguoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antiguo
        fields = '__all__'

class CamionSerializerFull(serializers.ModelSerializer):
    antiguo = AntiguoSerializer(required=False)
    moderno = ModernoSerializer(required=False)
    
    class Meta:
        model = Camion
        fields = 'id', 'marca', 'chapa', 'antiguo', 'moderno'
class CamionSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Camion
        fields = '__all__'


class ViajeInterprovincialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViajeInterprovincial
        fields = '__all__'

class ViajeSerializer(serializers.ModelSerializer):
    viaje_interprovincial = ViajeInterprovincialSerializer(required=False)
    chofer = ChoferSerializer()
    camion = CamionSerializer()

    class Meta:
        model = Viaje
        fields = '__all__'

class NominaSalarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = NominaSalario
        fields = '__all__'
