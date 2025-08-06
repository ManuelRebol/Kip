import { api } from './api';
import type { Note, CreateNoteData, UpdateNoteData } from '../types';

export const notesService = {
    async getNotes(params?: { search?: string; is_favorite?: boolean }) {
        const response = await api.get('/notes/', { params });
        return response.data;
    },

    async getNote(id: number): Promise<Note> {
        const response = await api.get(`/notes/${id}/`);
        return response.data;
    },

    async createNote(data: CreateNoteData): Promise<Note> {
        const response = await api.post('/notes/', data);
        return response.data;
    },

    async updateNote(id: number, data: UpdateNoteData): Promise<Note> {
        const response = await api.put(`/notes/${id}/`, data);
        return response.data;
    },

    async deleteNote(id: number): Promise<void> {
        await api.delete(`/notes/${id}/`);
    },

    async toggleFavorite(id: number) {
        const response = await api.patch(`/notes/${id}/toggle-favorite/`);
        return response.data;
    },

    async getFavoriteNotes() {
        const response = await api.get('/notes/favorites/');
        return response.data;
    },
};