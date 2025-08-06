import { NotesView } from '../../components/notes/NotesView/NotesView';
import { Layout } from '../../components/layout/Layout/Layout';
import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';

export const NotesPage = () => {
  const { user } = useAuthStore();
  const { createNote, updateNote, deleteNote, toggleFavorite } = useNotesStore();

  return (
    <Layout user={user || undefined} variant="default">
      <NotesView
        onCreateNote={createNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onToggleFavorite={toggleFavorite}
      />
    </Layout>
  );
};