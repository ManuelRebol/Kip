from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Note
from .serializers import NoteSerializer, NoteCreateSerializer, NoteUpdateSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return NoteCreateSerializer
        return NoteSerializer
    
    def get_queryset(self):
        queryset = Note.objects.filter(user=self.request.user)
        is_favorite = self.request.query_params.get('is_favorite')
        search = self.request.query_params.get('search')
        
        if is_favorite is not None:
            queryset = queryset.filter(is_favorite=is_favorite.lower() == 'true')
        
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) | 
                models.Q(content__icontains=search)
            )
        
        return queryset

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return NoteUpdateSerializer
        return NoteSerializer
    
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, pk):
    note = get_object_or_404(Note, pk=pk, user=request.user)
    note.is_favorite = not note.is_favorite
    note.save()
    
    serializer = NoteSerializer(note)
    return Response({
        'message': f'Nota {"agregada a" if note.is_favorite else "removida de"} favoritos',
        'note': serializer.data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favorite_notes(request):
    notes = Note.objects.filter(user=request.user, is_favorite=True)
    serializer = NoteSerializer(notes, many=True)
    return Response({
        'count': notes.count(),
        'results': serializer.data
    })