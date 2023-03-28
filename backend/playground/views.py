from django.shortcuts import render
from .models import expensesList
from rest_framework import generics
from .serializers import PlaygroundSerializers
# Create your views here.


class SetExpensesView(generics.CreateAPIView):
      queryset = expensesList.objects.all()
      serializer_class = PlaygroundSerializers
      
class ListExpensesView(generics.ListAPIView):
      serializer_class = PlaygroundSerializers
      def get_queryset(self):
          return expensesList.objects.all()
      