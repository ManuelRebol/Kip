from django.urls import path
from . import views

urlpatterns = [
    path('', views.NoteListCreateView.as_view(), name='note-list-create'),
    path('<int:pk>/', views.NoteDetailView.as_view(), name='note-detail'),
    path('<int:pk>/toggle-favorite/', views.toggle_favorite, name='toggle-favorite'),
    path('favorites/', views.favorite_notes, name='favorite-notes'),
]