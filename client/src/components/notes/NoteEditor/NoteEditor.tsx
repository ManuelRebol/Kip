import type { ComponentProps } from 'react'
import { useState, useEffect } from 'react'
import type { Note, CreateNoteData, UpdateNoteData } from '../../../types'
import { Button } from '../../ui/Button/Button'
import Styles from './NoteEditor.module.css'

type Props = ComponentProps<'div'> & {
    note?: Note
    onSave: (data: CreateNoteData | UpdateNoteData) => void
    onCancel: () => void
    onDelete?: (id: number) => void
    isLoading?: boolean
}

export const NoteEditor = ({
    note,
    onSave,
    onCancel,
    onDelete,
    isLoading = false,
    className,
    ...rest
}: Props) => {
    const [title, setTitle] = useState(note?.title || '')
    const [content, setContent] = useState(note?.content || '')
    const [isFavorite, setIsFavorite] = useState(note?.is_favorite || false)

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setIsFavorite(note.is_favorite)
        }
    }, [note])

    const handleSave = () => {
        const data = {
            title: title.trim() || 'Sin título',
            content: content.trim(),
            is_favorite: isFavorite,
        }
        onSave(data)
    }

    const handleDelete = () => {
        if (note?.id && onDelete) {
            if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
                onDelete(note.id)
            }
        }
    }

    const isModified = note
        ? title !== note.title ||
          content !== note.content ||
          isFavorite !== note.is_favorite
        : title.trim() !== '' || content.trim() !== ''

    return (
        <div {...rest} className={`${Styles.editor} ${className ?? ''}`}>
            <div className={Styles.editorHeader}>
                <h2 className={Styles.editorTitle}>
                    {note ? 'Editar Nota' : 'Nueva Nota'}
                </h2>
                <div className={Styles.editorActions}>
                    <Button
                        variant="ghost"
                        size="small"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={handleSave}
                        disabled={isLoading || !isModified}
                        loading={isLoading}
                    >
                        {note ? 'Actualizar' : 'Crear'}
                    </Button>
                </div>
            </div>

            <div className={Styles.editorContent}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la nota..."
                    className={Styles.titleInput}
                    disabled={isLoading}
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu nota aquí..."
                    className={Styles.contentTextarea}
                    disabled={isLoading}
                />
            </div>

            <div className={Styles.editorFooter}>
                <div className={Styles.favoriteToggle}>
                    <input
                        type="checkbox"
                        id="favorite-toggle"
                        checked={isFavorite}
                        onChange={(e) => setIsFavorite(e.target.checked)}
                        disabled={isLoading}
                    />
                    <label htmlFor="favorite-toggle">
                        Marcar como favorito
                    </label>
                </div>

                <div>
                    {note && onDelete && (
                        <Button
                            variant="danger"
                            size="small"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            Eliminar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
