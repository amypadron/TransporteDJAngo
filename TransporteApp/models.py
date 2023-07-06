from django.db import models


class User(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    usuario = models.CharField(max_length=255)
    pasword = models.CharField(max_length=255)

    def __str__(self):
        return self.usuario


class Trabajador(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ci = models.CharField(max_length=11)
    sexo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=255, blank=True, null=True)
    direccion_particular = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    anios_experiencia = models.IntegerField()
    nivel_escolar = models.CharField(max_length=255)
    salario_basico = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.RESTRICT)

    def __str__(self):
        return self.nombre


class Camion(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    chapa = models.CharField(max_length=255, unique=True)
    marca = models.CharField(max_length=255)

    def __str__(self):
        return self.chapa


class Moderno(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    gasto_km = models.CharField(max_length=255)
    camion = models.OneToOneField(Camion, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Antiguo(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    anio_fabricacion = models.IntegerField()
    cantidad_reparaciones = models.IntegerField()
    camion = models.OneToOneField(Camion, on_delete=models.CASCADE)

    def __str__(self):
        return self.id



class Chofer(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tipo = models.CharField(max_length=255)
    cantidad_viajes = models.IntegerField()
    evaluacion_mensual = models.IntegerField()
    trabajador = models.OneToOneField(Trabajador, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Administrativo(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cargo = models.CharField(max_length=255)
    trabajador = models.OneToOneField(Trabajador, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class Viaje(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    carga_transportada = models.IntegerField()
    km_recorrido = models.IntegerField()
    dia_semana = models.DateTimeField()
    chofer = models.ForeignKey(Chofer, on_delete=models.CASCADE)
    camion = models.ForeignKey(Camion, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class ViajeInterprovincial(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    provincias_recorridas = models.IntegerField()
    dia_regreso = models.DateTimeField()
    viaje = models.OneToOneField(Viaje, on_delete=models.CASCADE)

    def __str__(self):
        return self.id


class NominaSalario(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    crated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cantidad_dias = models.IntegerField()
    salario = models.IntegerField()
    mes = models.DateTimeField()
    trabajador = models.ForeignKey(Trabajador, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

