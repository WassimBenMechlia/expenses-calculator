from django.db import models

# Create your models here.
class expensesList(models.Model):
      expense = models.CharField(max_length=200)
      amount = models.IntegerField(default=0)
      def __str__(self):
          return self.expense
      

