import type { ComponentProps } from 'react'
import type { LoginCredentials } from '../../../types'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Styles from './LoginForm.module.css'
import { useState } from 'react'

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
    onSubmit: (credentials: LoginCredentials) => Promise<void> // Cambiado para manejar promesas
    onRegisterClick?: () => void
    isLoading?: boolean
    error?: string
    formData: LoginCredentials
    setFormData: (
        data: LoginCredentials | ((prev: LoginCredentials) => LoginCredentials)
    ) => void
}

export const LoginForm = ({
    onSubmit,
    onRegisterClick,
    isLoading = false,
    error,
    formData,
    setFormData,
    ...rest
}: Props) => {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange =
        (field: keyof LoginCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [field]: e.target.value })
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: '' }))
            }
        }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.password)
            newErrors.password = 'La contraseña es requerida'
        if (!formData.email.trim()) newErrors.email = 'El email es requerido'
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
            newErrors.email = 'El email no es válido.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        try {
            await onSubmit(formData)
        } catch (err) {
            console.error('Error during form submission', err)
            throw err 
        }
    }

    return (
        <form
            {...rest}
            className={`${Styles.loginForm}`}
            onSubmit={handleSubmit}
            noValidate={true}
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
                    error={errors.email}
                />

                <Input
                    type="password"
                    name="current_password"
                    label="Contraseña"
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="••••••••"
                    disabled={isLoading}
                    error={errors.password} // Mostrar error en el campo
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
                    disabled={
                        isLoading || !formData.email || !formData.password
                    }
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
