from django import forms
from .models import Trabajador
from .models import Viaje
class TrabajadorForm(forms.ModelForm):
    class Meta:
        model = Trabajador
        fields = '__all__'  # Incluye todos los campos del modelo en el formulario


    # Puedes personalizar los campos o agregar validaciones adicionales aquí si es necesario
class ViajeForm(forms.ModelForm):
    class Meta:
        model = Viaje
        fields = '__all__' 