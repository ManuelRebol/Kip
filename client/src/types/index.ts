export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
    user: string;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
}

export interface CreateNoteData {
    title: string;
    content: string;
    is_favorite?: boolean;
}

export interface UpdateProfileData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export type UpdateNoteData = Partial<CreateNoteData>;

export interface ApiResponse<T> {
    message?: string;
    results?: T[];
    count?: number;
    user?: User;
    tokens?: AuthTokens;
    note?: Note;
}
export interface MobileState {
    isDrawerOpen: boolean;
    isEditing: boolean;
    selectedNote: Note | null;
}

export interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export interface ResponsiveLayoutProps {
    isMobile: boolean;
    showMobileDrawer: boolean;
    onMobileDrawerToggle: () => void;
}