import email
from operator import mod
from unicodedata import name
from django.db import models

# Create your models here.
class Address(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Client(models.Model):
    name = models.CharField(max_length=50, verbose_name=('Nombre Completo'))
    phone = models.CharField(max_length=100, verbose_name=('Telefono'))
    email = models.EmailField(max_length=100, verbose_name=('Correo electrónico'))
    address = models.ManyToManyField(Address, related_name='direcciones')

    def __str__(self):
        return self.name
