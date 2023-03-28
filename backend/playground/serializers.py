from rest_framework import serializers
from .models import expensesList

class PlaygroundSerializers(serializers.ModelSerializer):
      class Meta:
            model = expensesList
            fields = ('id' , 'expense' , 'amount')