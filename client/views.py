from django.http import request
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Address, Client
from .serializers import AddressSerializer, ClientSerializer

# ViewSets define the view behavior.


"""
apiOverview is a method designed to serve as an index of the urls of this API
"""
@api_view(['GET'])
def apiOverview(request): 
    api_urls = {
        'List': '/client-list',
        'Create': '/client-create/',
        'Update': '/client-update/<str:pk>',
        'Delete': '/client-delete/<str:pk>',
        'Address list': '/address-list',
        'Address create': '/address-create',
    }
    return Response(api_urls)

# Read
@api_view(['GET'])
def client_list(request):
    clients = Client.objects.all()
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)

# Create
@api_view(['POST'])
def client_create(request):
    serializer = ClientSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Update
@api_view(['POST'])
def client_update(request, pk):
    client = Client.objects.get(id=pk)
    serializer = ClientSerializer(instance=client, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Delete

@api_view(['DELETE'])
def client_delete(request, pk):
    client = Client.objects.get(id=pk)
    client.delete()
    
    return Response('Client Succesfully Deleted')



# Read Address
@api_view(['GET'])
def Adress_list(request):
    clients = Address.objects.all()
    serializer = AddressSerializer(clients, many=True)
    return Response(serializer.data)

# Create Address
@api_view(['POST'])
def address_create(request):
    serializer = AddressSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
