import { create } from 'zustand'
import type { Note, CreateNoteData, UpdateNoteData } from '../types'
import { notesService } from '../services/notesService'

interface NotesState {
    notes: Note[]
    selectedNote: Note | null
    isLoading: boolean
    searchTerm: string
    showFavoritesOnly: boolean
    fetchNotes: () => Promise<void>
    createNote: (data: CreateNoteData) => Promise<void>
    updateNote: (id: number, data: UpdateNoteData) => Promise<void>
    deleteNote: (id: number) => Promise<void>
    toggleFavorite: (id: number) => Promise<void>
    setSelectedNote: (note: Note | null) => void
    setSearchTerm: (term: string) => void
    setShowFavoritesOnly: (show: boolean) => void
}

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: [],
    selectedNote: null,
    isLoading: false,
    searchTerm: '',
    showFavoritesOnly: false,

    fetchNotes: async () => {
        const { searchTerm, showFavoritesOnly } = get()
        set({ isLoading: true })
        try {
            const response = await notesService.getNotes({
                search: searchTerm || undefined,
                is_favorite: showFavoritesOnly || undefined,
            })
            set({ notes: response.results || [] })
        } catch (error) {
            console.error('Error fetching notes:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    createNote: async (data) => {
        try {
            const newNote = await notesService.createNote(data)
            set((state) => ({ notes: [newNote, ...state.notes] }))
        } catch (error) {
            console.error('Error creating note:', error)
        }
    },

    updateNote: async (id, data) => {
        try {
            const updatedNote = await notesService.updateNote(id, data)
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === id ? updatedNote : note
                ),
                selectedNote: updatedNote,
            }))
        } catch (error) {
            console.error('Error updating note:', error)
        }
    },

    deleteNote: async (id) => {
        try {
            await notesService.deleteNote(id)
            set((state) => ({
                notes: state.notes.filter((note) => note.id !== id),
                selectedNote:
                    state.selectedNote?.id === id ? null : state.selectedNote,
            }))
        } catch (error) {
            console.error('Error deleting note:', error)
        }
    },

    toggleFavorite: async (id) => {
        try {
            const response = await notesService.toggleFavorite(id)
            const updatedNote = response.note
            set((state) => ({
                notes: state.notes.map((note) =>
                    note.id === id ? updatedNote : note
                ),
            }))
        } catch (error) {
            console.error('Error toggling favorite:', error)
        }
    },

    setSelectedNote: (note) => set({ selectedNote: note }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
}))
