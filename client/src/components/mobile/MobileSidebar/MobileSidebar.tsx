import type { ComponentProps } from 'react';
import type { User, Note } from '../../../types';
import ProfileCard from '../../ProfileCard/ProfileCard';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { NoteCard } from '../../notes/NoteCard/NoteCard';
import Styles from './MobileSidebar.module.css';

type Props = ComponentProps<'div'> & {
  user: User;
  notes: Note[];
  searchTerm: string;
  showFavoritesOnly: boolean;
  onSearchChange: (term: string) => void;
  onFilterChange: (showFavorites: boolean) => void;
  onNoteClick: (note: Note) => void;
  onToggleFavorite: (id: number) => void;
  onCreateNote: () => void;
  onLogout: () => void;
};

export const MobileSidebar = ({
  user,
  notes,
  searchTerm,
  showFavoritesOnly,
  onSearchChange,
  onFilterChange,
  onNoteClick,
  onToggleFavorite,
  onCreateNote,
  onLogout,
  className,
  ...rest
}: Props) => {
  const favoriteNotes = notes.filter(note => note.is_favorite);
  const noteCount = notes.length;
  const favoriteCount = favoriteNotes.length;

  return (
    <div {...rest} className={`${Styles.sidebar} ${className ?? ''}`}>
      {/* Profile Section */}
      <div className={Styles.profileSection}>
        <ProfileCard
          name={`${user.first_name} ${user.last_name}`}
          role={user.email}
          avatarUrl="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDI0QzI3LjMxMzcgMjQgMzAgMjEuMzEzNyAzMCAxOEMzMCAxNC42ODYzIDI3LjMxMzcgMTIgMjQgMTJDMjAuNjg2MyAxMiAxOCAxNC42ODYzIDE4IDE4QzE4IDIxLjMxMzcgMjAuNjg2MyAyNCAyNCAyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTM2IDM2QzM2IDMwLjQ3NzIgMzEuNTIyOCAyNiAyNiAyNkgyMkMxNi40NzcyIDI2IDEyIDMwLjQ3NzIgMTIgMzZIMzZaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo="
        />
      </div>

      {/* Search and Filters */}
      <div className={Styles.searchSection}>
        <Input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={Styles.searchInput}
        />
        
        <div className={Styles.filterButtons}>
          <button
            className={`${Styles.filterButton} ${!showFavoritesOnly ? Styles.active : ''}`}
            onClick={() => onFilterChange(false)}
          >
            Todas ({noteCount})
          </button>
          
          <button
            className={`${Styles.filterButton} ${showFavoritesOnly ? Styles.active : ''}`}
            onClick={() => onFilterChange(true)}
          >
            Favoritos ({favoriteCount})
          </button>
        </div>

        <Button 
          variant="primary" 
          onClick={onCreateNote}
          className={Styles.createButton}
        >
          + Nueva Nota
        </Button>
      </div>

      {/* Notes List */}
      <div className={Styles.notesSection}>
        <div className={Styles.notesHeader}>
          <h3 className={Styles.notesTitle}>
            {showFavoritesOnly ? 'Notas favoritas' : 'Todas las notas'}
          </h3>
        </div>
        
        <div className={Styles.notesList}>
          {notes.length === 0 ? (
            <div className={Styles.emptyState}>
              <div className={Styles.emptyIcon}>📝</div>
              <p className={Styles.emptyMessage}>
                {showFavoritesOnly 
                  ? 'No tienes notas favoritas' 
                  : 'No hay notas'
                }
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => onNoteClick(note)}
                onToggleFavorite={onToggleFavorite}
                className={Styles.noteCard}
              />
            ))
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className={Styles.logoutSection}>
        <Button 
          variant="ghost" 
          onClick={onLogout}
          className={Styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};