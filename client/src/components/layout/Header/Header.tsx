import type { ComponentProps } from 'react'
import type { User } from '../../../types'
import { Button } from '../../ui/Button/Button'
import ProfileCard from '../../ProfileCard/ProfileCard'
import Styles from './Header.module.css'
import { useAuthStore } from '../../../store/authStore'

type Props = ComponentProps<'header'> & {
    user?: User
    onProfileEdit?: () => void
    onLogout?: () => void
}

export const Header = ({ user, onProfileEdit, className, ...rest }: Props) => {
    const { logout } = useAuthStore()

    const defaultAvatar =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDI0QzI3LjMxMzcgMjQgMzAgMjEuMzEzNyAzMCAxOEMzMCAxNC42ODYzIDI3LjMxMzcgMTIgMjQgMTJDMjAuNjg2MyAxMiAxOCAxNC42ODYzIDE4IDE4QzE4IDIxLjMxMzcgMjAuNjg2MyAyNCAyNCAyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTM2IDM2QzM2IDMwLjQ3NzIgMzEuNTIyOCAyNiAyNiAyNkgyMkMxNi40NzcyIDI2IDEyIDMwLjQ3NzIgMTIgMzZIMzZaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='

    const handleLogout = () => {
        try {
            logout()
        } catch {
            console.log('Error al cerrar sesión')
        }
    }

    return (
        <header {...rest} className={`${Styles.header} ${className ?? ''}`}>
            <div className={Styles.headerContent}>
                <a href="/" className={Styles.logo}>
                    <div className={Styles.logoIcon}>K</div>
                    <h1 className={Styles.logoText}>Kip</h1>
                </a>

                <div className={Styles.headerActions}>
                    {user ? (
                        <>
                            <ProfileCard
                                name={`${user.first_name} ${user.last_name}`}
                                role={user.email}
                                avatarUrl={defaultAvatar}
                                onEdit={onProfileEdit || (() => {})}
                            />
                            <Button variant="ghost" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary">Iniciar Sesión</Button>
                    )}
                </div>
            </div>
        </header>
    )
}
