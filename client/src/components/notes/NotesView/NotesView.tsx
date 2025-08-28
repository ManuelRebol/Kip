import type { ComponentProps } from 'react'
import { useState, useEffect } from 'react'
import type { Note, CreateNoteData, UpdateNoteData} from '../../../types'
import { NotesList } from '../NotesList/NotesList'
import { NoteEditor } from '../NoteEditor/NoteEditor'
import { MobileDrawer } from '../../mobile/MobileDrawer/MobileDrawer'
import { MobileSidebar } from '../../mobile/MobileSidebar/MobileSidebar'
import { useNotesStore } from '../../../store/notesStore'
import { useAuthStore } from '../../../store/authStore'
import Styles from './NotesView.module.css'

type Props = ComponentProps<'div'> & {
    onCreateNote: (data: CreateNoteData) => Promise<void>
    onUpdateNote: (id: number, data: UpdateNoteData) => Promise<void>
    onDeleteNote: (id: number) => Promise<void>
    onToggleFavorite: (id: number) => Promise<void>
    onFetchNotes: () => Promise<void>
    isLoading?: boolean
    isMobileDrawerOpen?: boolean
    onMobileDrawerToggle?: () => void
}

export const NotesView = ({
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    onToggleFavorite,
    onFetchNotes,
    isLoading = false,
    isMobileDrawerOpen = false,
    onMobileDrawerToggle,
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
    } = useNotesStore()

    const { user, logout } = useAuthStore()

    const [isEditing, setIsEditing] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | undefined>()

    useEffect(() => {
        if (selectedNote) {
            setEditingNote(selectedNote)
            setIsEditing(true)
        }
    }, [selectedNote])

    useEffect(() => {
        onFetchNotes()
    }, [searchTerm, showFavoritesOnly, onFetchNotes])

    const handleCreateNote = () => {
        setEditingNote(undefined)
        setIsEditing(true)
        setSelectedNote(null)
        // Cerrar drawer en móvil al crear nota
        if (onMobileDrawerToggle && isMobileDrawerOpen) {
            onMobileDrawerToggle()
        }
    }

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note)
        // Cerrar drawer en móvil al seleccionar nota
        if (onMobileDrawerToggle && isMobileDrawerOpen) {
            onMobileDrawerToggle()
        }
    }

    const handleSaveNote = async (data: CreateNoteData | UpdateNoteData) => {
        try {
            if (editingNote?.id) {
                await onUpdateNote(editingNote.id, data)
            } else {
                await onCreateNote(data as CreateNoteData)
            }

            await onFetchNotes()

            setIsEditing(false)
            setEditingNote(undefined)
            setSelectedNote(null)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDeleteNote = async (id: number) => {
        try {
            await onDeleteNote(id)
            setIsEditing(false)
            setEditingNote(undefined)
            setSelectedNote(null)
        } catch (error) {
            console.error('Error deleting note:', error)
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setEditingNote(undefined)
        setSelectedNote(null)
    }

    const handleLogout = () => {
        try {
            logout()
        } catch {
            console.log('Error al cerrar sesión')
        }
    }

    const filteredNotes = showFavoritesOnly
        ? notes.filter((note) => note.is_favorite)
        : notes

    return (
        <>
            <div {...rest} className={`${Styles.notesView} ${className ?? ''}`}>
                {/* Desktop Layout */}
                <div className={Styles.desktopLayout}>
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
                                onDelete={
                                    editingNote?.id ? handleDeleteNote : undefined
                                }
                                isLoading={isLoading}
                            />
                        ) : (
                            <div className={Styles.editorPanelEmpty}>
                                <div>
                                    <div className={Styles.emptyIcon}>✏️</div>
                                    <p>
                                        Selecciona una nota para editarla
                                        <br />o crea una nueva
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className={Styles.mobileLayout}>
                    {isEditing ? (
                        <div className={Styles.mobileEditor}>
                            <NoteEditor
                                note={editingNote}
                                onSave={handleSaveNote}
                                onCancel={handleCancelEdit}
                                onDelete={
                                    editingNote?.id ? handleDeleteNote : undefined
                                }
                                isLoading={isLoading}
                                className={Styles.mobileNoteEditor}
                            />
                        </div>
                    ) : (
                        <div className={Styles.mobileNotesContainer}>
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
                                className={Styles.mobileNotesList}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Drawer */}
            {user && (
                <MobileDrawer
                    isOpen={isMobileDrawerOpen}
                    onClose={() => onMobileDrawerToggle?.()}
                    title="Menú"
                >
                    <MobileSidebar
                        user={user}
                        notes={filteredNotes}
                        searchTerm={searchTerm}
                        showFavoritesOnly={showFavoritesOnly}
                        onSearchChange={setSearchTerm}
                        onFilterChange={setShowFavoritesOnly}
                        onNoteClick={handleNoteClick}
                        onToggleFavorite={onToggleFavorite}
                        onCreateNote={handleCreateNote}
                        onLogout={handleLogout}
                    />
                </MobileDrawer>
            )}
        </>
    )
}