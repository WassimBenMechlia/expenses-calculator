from django.urls import path
from .views import SetExpensesView , ListExpensesView

urlpatterns=[ 
      path('list', ListExpensesView.as_view()),
      path('set', SetExpensesView.as_view())
]
