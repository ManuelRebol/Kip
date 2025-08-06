import type { ComponentProps } from 'react'
import { useState } from 'react'
import { X } from 'lucide-react'
import { LoginForm } from '../LoginForm/LoginForm'
import { RegisterForm } from '../RegisterForm/RegisterForm'
import { useAuthStore } from '../../../store/authStore'
import type { LoginCredentials, RegisterData } from '../../../types'
import Styles from './AuthModal.module.css'

type Props = ComponentProps<'div'> & {
    isOpen: boolean
    onClose: () => void
    initialMode?: 'login' | 'register'
}

export const AuthModal = ({
    isOpen,
    onClose,
    initialMode = 'login',
    className,
    ...rest
}: Props) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode)
    const { login, register, isLoading } = useAuthStore()
    const [error, setError] = useState<string>('')

    if (!isOpen) return null

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
        setError('')
    }

    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            setError('')
            await login(credentials)
            onClose()
        } catch {
            setError('Error al iniciar sesión. Verifica tus credenciales.')
        }
    }

    const handleRegister = async (data: RegisterData) => {
        try {
            setError('')
            await register(data)
            onClose()
        } catch {
            setError('Error al crear la cuenta. Intenta nuevamente.')
        }
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setMode('login')
            onClose()
        }
    }

    return (
        <div
            {...rest}
            className={`${Styles.modalOverlay} ${className ?? ''}`}
            onClick={handleOverlayClick}
        >
            <div className={Styles.modalContent}>
                {/* Close Button */}
                <button
                    type="button"
                    className={Styles.closeButton}
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    <X className={Styles.CloseIcon}/>
                </button>

                {/* Forms Container */}
                <div className={Styles.formsContainer}>
                    {mode === 'login' ? (
                        <LoginForm
                            onSubmit={handleLogin}
                            onRegisterClick={toggleMode}
                            isLoading={isLoading}
                            error={error}
                        />
                    ) : (
                        <RegisterForm
                            
                            onSubmit={handleRegister}
                            onLoginClick={toggleMode}
                            isLoading={isLoading}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
