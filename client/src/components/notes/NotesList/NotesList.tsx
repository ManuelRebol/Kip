import type { ComponentProps } from 'react';
import type { Note } from '../../../types';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { NoteCard } from '../NoteCard/NoteCard';
import Styles from './NotesList.module.css';

type Props = ComponentProps<'div'> & {
  notes: Note[];
  searchTerm: string;
  showFavoritesOnly: boolean;
  isLoading?: boolean;
  onSearchChange: (term: string) => void;
  onFilterChange: (showFavorites: boolean) => void;
  onNoteClick: (note: Note) => void;
  onToggleFavorite: (id: number) => void;
  onCreateNote: () => void;
};

export const NotesList = ({ 
  notes,
  searchTerm,
  showFavoritesOnly,
  isLoading = false,
  onSearchChange,
  onFilterChange,
  onNoteClick,
  onToggleFavorite,
  onCreateNote,
  className, 
  ...rest 
}: Props) => {


  const favoriteNotes = notes.filter(note => note.is_favorite);
  const noteCount = notes.length;
  const favoriteCount = favoriteNotes.length;

  return (
    <div {...rest} className={`${Styles.notesList} ${className ?? ''}`}>
      <div className={Styles.listHeader}>
        <h2 className={Styles.listTitle}>
          {showFavoritesOnly ? `Favoritos (${favoriteCount})` : `Mis Notas (${noteCount})`}
        </h2>
        <div className={Styles.listActions}>
          <Button variant="primary" onClick={onCreateNote}>
            + Nueva Nota
          </Button>
        </div>
      </div>

      <div className={Styles.searchContainer}>
        <Input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={Styles.searchInput}
        />
        
        <button
          className={`${Styles.filterButton} ${!showFavoritesOnly ? Styles.active : ''}`}
          onClick={() => onFilterChange(false)}
        >
          Todas
        </button>
        
        <button
          className={`${Styles.filterButton} ${showFavoritesOnly ? Styles.active : ''}`}
          onClick={() => onFilterChange(true)}
        >
          Favoritos
        </button>
      </div>

      {isLoading ? (
        <div className={Styles.loadingState}>
          <p>Cargando notas...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className={Styles.emptyState}>
          <div className={Styles.emptyStateIcon}>📝</div>
          <h3 className={Styles.emptyStateTitle}>
            {showFavoritesOnly ? 'No tienes notas favoritas' : 'No hay notas'}
          </h3>
          <p className={Styles.emptyStateMessage}>
            {showFavoritesOnly 
              ? 'Marca algunas notas como favoritas para verlas aquí'
              : 'Crea tu primera nota para empezar'
            }
          </p>
        </div>
      ) : (
        <div className={Styles.notesGrid}>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => onNoteClick} //ATENCION: esta función fue modificada
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};