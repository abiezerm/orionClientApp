from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('client-list/', views.client_list, name='client-list'),
    path('client-create/', views.client_create, name='client-create'),
    path('client-update/<str:pk>/', views.client_update, name='client-update'),
    path('client-delete/<str:pk>/', views.client_delete, name="client-delete"),
    path('address-list/', views.Adress_list, name='address-list'),
    path('address-create/', views.address_create, name='address-create'),

]