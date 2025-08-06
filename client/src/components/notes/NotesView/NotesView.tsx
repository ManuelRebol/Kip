import type { ComponentProps } from 'react';
import { useState, useEffect } from 'react';
import type { Note, CreateNoteData, UpdateNoteData } from '../../../types';
import { NotesList } from '../NotesList/NotesList';
import { NoteEditor } from '../NoteEditor/NoteEditor';
import { useNotesStore } from '../../../store/notesStore';
import Styles from './NotesView.module.css';

type Props = ComponentProps<'div'> & {
  onCreateNote: (data: CreateNoteData) => Promise<void>;
  onUpdateNote: (id: number, data: UpdateNoteData) => Promise<void>;
  onDeleteNote: (id: number) => Promise<void>;
  onToggleFavorite: (id: number) => Promise<void>;
  isLoading?: boolean;
};

export const NotesView = ({ 
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onToggleFavorite,
  isLoading = false,
  className, 
  ...rest 
}: Props) => {
  const {
    notes,
    selectedNote,
    searchTerm,
    showFavoritesOnly,
    setSelectedNote,
    setSearchTerm,
    setShowFavoritesOnly,
  } = useNotesStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  useEffect(() => {
    if (selectedNote) {
      setEditingNote(selectedNote);
      setIsEditing(true);
    }
  }, [selectedNote]);

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setIsEditing(true);
    setSelectedNote(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveNote = async (data: CreateNoteData | UpdateNoteData) => {
    try {
      if (editingNote?.id) {
        await onUpdateNote(editingNote.id, data);
      } else {
        await onCreateNote(data as CreateNoteData);
      }
      setIsEditing(false);
      setEditingNote(undefined);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await onDeleteNote(id);
      setIsEditing(false);
      setEditingNote(undefined);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingNote(undefined);
    setSelectedNote(null);
  };

  const filteredNotes = showFavoritesOnly 
    ? notes.filter(note => note.is_favorite)
    : notes;

  return (
    <div {...rest} className={`${Styles.notesView} ${className ?? ''}`}>
      <div className={Styles.notesPanel}>
        <div className={Styles.notesListContainer}>
          <NotesList
            notes={filteredNotes}
            searchTerm={searchTerm}
            showFavoritesOnly={showFavoritesOnly}
            isLoading={isLoading}
            onSearchChange={setSearchTerm}
            onFilterChange={setShowFavoritesOnly}
            onNoteClick={handleNoteClick}
            onToggleFavorite={onToggleFavorite}
            onCreateNote={handleCreateNote}
          />
        </div>
      </div>

      <div className={Styles.editorPanel}>
        {isEditing ? (
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
            onDelete={editingNote?.id ? handleDeleteNote : undefined}
            isLoading={isLoading}
          />
        ) : (
          <div className={Styles.editorPanelEmpty}>
            <div>
              <div className={Styles.emptyIcon}>✏️</div>
              <p>Selecciona una nota para editarla<br />o crea una nueva</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};