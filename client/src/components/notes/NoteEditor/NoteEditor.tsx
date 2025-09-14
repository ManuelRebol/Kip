import type { ComponentProps } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Note, CreateNoteData, UpdateNoteData } from '../../../types'
import { Button } from '../../ui/Button/Button'
import { MarkdownToolbar } from '../../markdown/MarkdownToolbar/MarkdownToolbar'
import { MarkdownPreview } from '../../markdown/MarkdownPreview/MarkdownPreview'
import { markdownUtils } from '../../../utils/markdown'
import Styles from './NoteEditor.module.css'
import { Download } from 'lucide-react'
import { download } from '../../../utils/download'

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
    const [showPreview, setShowPreview] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

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

    const handleDownload = () => {
        const noteTitle = title.trim() || 'Sin título'
        const noteContent = content.trim() || ''

        download.downloadMarkdown(noteTitle, noteContent)
    }

    const handleFormat = useCallback(
        (format: string) => {
            const textarea = textareaRef.current
            if (!textarea) return

            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const { text, newStart, newEnd } = markdownUtils.insertFormat(
                content,
                start,
                end,
                format
            )

            setContent(text)

            // Enfocar el textarea y establecer la nueva selección
            setTimeout(() => {
                textarea.focus()
                textarea.setSelectionRange(newStart, newEnd)
            }, 0)
        },
        [content]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            // Atajos de teclado para formato
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault()
                        handleFormat('bold')
                        break
                    case 'i':
                        e.preventDefault()
                        handleFormat('italic')
                        break
                    case 'k':
                        e.preventDefault()
                        handleFormat('link')
                        break
                    case 'm':
                        e.preventDefault()
                        handleFormat('math')
                        break
                    case '`':
                        e.preventDefault()
                        handleFormat('code')
                        break
                    case '1':
                        e.preventDefault()
                        handleFormat('h1')
                        break
                    case '2':
                        e.preventDefault()
                        handleFormat('h2')
                        break
                    case '3':
                        e.preventDefault()
                        handleFormat('h3')
                        break
                }
            }

            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'I':
                        e.preventDefault()
                        handleFormat('image')
                        break
                    case '*':
                        e.preventDefault()
                        handleFormat('ul')
                        break
                    case '&': // Shift+7
                        e.preventDefault()
                        handleFormat('ol')
                        break
                    case '(': // Shift+9
                        e.preventDefault()
                        handleFormat('quote')
                        break
                }
            }

            // Tab para indentación
            if (e.key === 'Tab') {
                e.preventDefault()
                const textarea = e.currentTarget
                const start = textarea.selectionStart
                const end = textarea.selectionEnd

                const newContent =
                    content.substring(0, start) + '  ' + content.substring(end)
                setContent(newContent)

                setTimeout(() => {
                    textarea.setSelectionRange(start + 2, start + 2)
                }, 0)
            }
        },
        [content, handleFormat]
    )

    const isModified = note
        ? title !== note.title ||
          content !== note.content ||
          isFavorite !== note.is_favorite
        : title.trim() !== '' || content.trim() !== ''

    const hasContent = title.trim() !== '' || content.trim() !== ''

    return (
        <div {...rest} className={`${Styles.editor} ${className ?? ''}`}>
            <div className={Styles.editorHeader}>
                <h2 className={Styles.editorTitle}>
                    {note ? 'Editar Nota' : 'Nueva Nota'}
                </h2>
                <div className={Styles.editorActions}>
                    {hasContent && (
                        <Button
                            variant="ghost"
                            size="small"
                            onClick={handleDownload}
                            disabled={isLoading}
                            title="Descargar como archivo Markdown (.md)"
                        >
                            <Download size={16} />
                        </Button>
                    )}
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

                <MarkdownToolbar
                    onFormat={handleFormat}
                    showPreview={showPreview}
                    onTogglePreview={() => setShowPreview(!showPreview)}
                />

                <div className={Styles.editorBody}>
                    {!showPreview ? (
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu nota en Markdown aquí..."
                            className={Styles.contentTextarea}
                            disabled={isLoading}
                        />
                    ) : (
                        <MarkdownPreview
                            markdown={content}
                            className={Styles.previewContainer}
                        />
                    )}
                </div>
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
