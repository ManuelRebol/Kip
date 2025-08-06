import type { ComponentProps } from 'react'
import { useState } from 'react'
import type { LoginCredentials } from '../../../types'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Styles from './LoginForm.module.css'

type Props = ComponentProps<'form'> & {
    onSubmit: (credentials: LoginCredentials) => void
    onRegisterClick?: () => void
    isLoading?: boolean
    error?: string
}

export const LoginForm = ({
    onSubmit,
    onRegisterClick,
    isLoading = false,
    error,
    className,
    ...rest
}: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ email, password })
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
                    name='current_email'
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    disabled={isLoading}
                />

                <Input
                    type="password"
                    name='current_password'
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
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
                    disabled={isLoading || !email || !password}
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
