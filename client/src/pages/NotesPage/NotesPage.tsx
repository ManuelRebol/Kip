// client/src/pages/NotesPage/NotesPage.tsx
import { useState } from 'react';
import { NotesView } from '../../components/notes/NotesView/NotesView';
import { Layout } from '../../components/layout/Layout/Layout';
import { useAuthStore } from '../../store/authStore';
import { useNotesStore } from '../../store/notesStore';

export const NotesPage = () => {
  const { user } = useAuthStore();
  const { createNote, updateNote, deleteNote, toggleFavorite, fetchNotes } = useNotesStore();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileDrawerOpen(true);
  };

  const handleDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  return (
    <Layout 
      user={user || undefined} 
      variant="default"
      onMenuClick={handleMenuClick}
      showMenuButton={true}
    >
      <NotesView
        onCreateNote={createNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onToggleFavorite={toggleFavorite}
        onFetchNotes={fetchNotes}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onMobileDrawerToggle={handleDrawerToggle}
      />
    </Layout>
  );
};