from django.db import models
from django.conf import settings

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notes')
    
    class Meta:
        ordering = ['-updated_at']
        verbose_name = 'Nota'
        verbose_name_plural = 'Notas'
    
    def __str__(self):
        return f"{self.title} - {self.user.email}"