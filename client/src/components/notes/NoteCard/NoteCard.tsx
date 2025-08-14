import type { ComponentProps } from 'react'
import type { Note } from '../../../types'
import { Card } from '../../ui/Card/Card'
import Styles from './NoteCard.module.css'

type Props = ComponentProps<'article'> & {
    note: Note
    onClick: (note: Note) => void
    onToggleFavorite: (id: number) => void
}

export const NoteCard = ({
    note,
    onClick,
    onToggleFavorite,
    className,
    ...rest
}: Props) => {
    const handleClick = () => {
        onClick(note)
    }

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onToggleFavorite(note.id)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <Card
            {...rest}
            className={`${Styles.noteCard} ${className ?? ''}`}
            onClick={handleClick}
        >
            <div className={Styles.noteHeader}>
                <h3 className={Styles.noteTitle}>
                    {note.title || 'Sin título'}
                </h3>
                <div className={Styles.noteActions}>
                    <button
                        className={`${Styles.favoriteButton} ${
                            note.is_favorite ? Styles.favorite : ''
                        }`}
                        onClick={handleFavoriteClick}
                        title={
                            note.is_favorite
                                ? 'Quitar de favoritos'
                                : 'Agregar a favoritos'
                        }
                    >
                        ★
                    </button>
                </div>
            </div>

            {note.content && (
                <p className={Styles.noteContent}>{note.content}</p>
            )}

            <div className={Styles.noteFooter}>
                <p className={Styles.noteDate}>{formatDate(note.updated_at)}</p>
                {note.is_favorite && (
                    <div className={Styles.favoriteIndicator}>
                        <span>★</span>
                        <span>Favorito</span>
                    </div>
                )}
            </div>
        </Card>
    )
}
