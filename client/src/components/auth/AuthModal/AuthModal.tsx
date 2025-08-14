import type { ComponentProps } from 'react'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { LoginForm } from '../LoginForm/LoginForm'
import { RegisterForm } from '../RegisterForm/RegisterForm'
import { useAuthStore } from '../../../store/authStore'
import type {
    LoginCredentials,
    RegisterData,
    UpdateProfileData,
} from '../../../types'
import Styles from './AuthModal.module.css'
import { EditProfileForm } from '../EditProfileForm/EditProfileForm'

type Props = ComponentProps<'div'> & {
    isOpen: boolean
    onClose: () => void
    initialMode?: 'login' | 'register' | 'profile' | 'password'
}

export const AuthModal = ({
    isOpen,
    onClose,
    initialMode = 'login',
    className,
    ...rest
}: Props) => {
    const [mode, setMode] = useState<
        'login' | 'register' | 'profile' | 'password'
    >(initialMode)
    const { login, register, updateProfile, isLoading, user, loadUser } = useAuthStore()
    const [error, setError] = useState<string>('')

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: '',
    })

    // Cargar datos del usuario al abrir el modal y si está autenticado
    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
                password_confirm: '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
            })
        }
    }, [isOpen, user])

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

    const handleEditProfile = async (data: UpdateProfileData) => {
        try {
            setError('')
            await updateProfile(data)
            await loadUser() 
            onClose()
        } catch {
            setError('Error al actualizar el perfil. Intenta nuevamente.')
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
                    <X className={Styles.CloseIcon} />
                </button>

                {/* Forms Container */}
                <div className={Styles.formsContainer}>
                    {mode === 'login' ? (
                        <LoginForm
                            onSubmit={handleLogin}
                            onRegisterClick={toggleMode}
                            isLoading={isLoading}
                            error={error}
                            formData={{
                                email: formData.email,
                                password: formData.password,
                            }}
                            setFormData={(data) =>
                                setFormData({ ...formData, ...data })
                            }
                        />
                    ) : mode === 'register' ? (
                        <RegisterForm
                            onSubmit={handleRegister}
                            onLoginClick={toggleMode}
                            isLoading={isLoading}
                            error={error}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ) : mode === 'profile' ? (
                        <EditProfileForm
                            onSubmit={handleEditProfile}
                            // onPasswordClick={() => setMode('editPassword')}
                            isLoading={isLoading}
                            error={error}
                            formData={{
                                email: formData.email,
                                first_name: formData.first_name,
                                last_name: formData.last_name,
                                username: formData.username,
                            }}
                            setFormData={(data) =>
                                setFormData({ ...formData, ...data })
                            }
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}
