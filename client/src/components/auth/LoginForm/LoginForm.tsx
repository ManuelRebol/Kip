import type { ComponentProps } from 'react'
import type { LoginCredentials } from '../../../types'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Styles from './LoginForm.module.css'

type Props = ComponentProps<'form'> & {
    onSubmit: (credentials: LoginCredentials) => void
    onRegisterClick?: () => void
    isLoading?: boolean
    error?: string
    formData: LoginCredentials;
    setFormData: (data: LoginCredentials | ((prev: LoginCredentials) => LoginCredentials)) => void
}

export const LoginForm = ({
    onSubmit,
    onRegisterClick,
    isLoading = false,
    error,
    className,
    formData,
    setFormData,
    ...rest
}: Props) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange =
        (field: keyof LoginCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(({ ...formData, [field]: e.target.value }))
        }

    return (
        <form
            {...rest}
            className={`${Styles.loginForm} ${className ?? ''}`}
            onSubmit={handleSubmit}
        >
            <h2 className={Styles.formTitle}>Iniciar Sesión</h2>

            <div className={Styles.formFields}>
                <Input
                    type="email"
                    name="current_email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="tu@email.com"
                    disabled={isLoading}
                />

                <Input
                    type="password"
                    name="current_password"
                    label="Contraseña"
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="••••••••"
                    disabled={isLoading}
                />

                {error && (
                    <p
                        style={{
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            margin: 0,
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>

            <div className={Styles.formActions}>
                <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isLoading || !formData.email || !formData.password}
                    loading={isLoading}
                >
                    Iniciar Sesión
                </Button>
            </div>

            {onRegisterClick && (
                <div className={Styles.formFooter}>
                    ¿No tienes cuenta?{' '}
                    <button
                        type="button"
                        className={Styles.formLink}
                        onClick={onRegisterClick}
                        disabled={isLoading}
                    >
                        Regístrate aquí
                    </button>
                </div>
            )}
        </form>
    )
}
