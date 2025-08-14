import type { ComponentProps } from 'react'
import { useState } from 'react'
import type { RegisterData } from '../../../types'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Styles from './RegisterForm.module.css'

type Props = Omit<ComponentProps<'form'>, 'onSubmit'> & {
    onSubmit: (data: RegisterData) => void
    onLoginClick?: () => void
    isLoading?: boolean
    error?: string
    formData: RegisterData;
    setFormData: (data: RegisterData | ((prev: RegisterData) => RegisterData)) => void
}

export const RegisterForm = ({
    onSubmit,
    onLoginClick,
    isLoading = false,
    error,
    className,
    formData,
    setFormData,
    ...rest
}: Props) => {

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange =
        (field: keyof RegisterData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }))
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: '' }))
            }
        }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.username.trim())
            newErrors.username = 'El nombre de usuario es requerido'
        if (!formData.email.trim()) newErrors.email = 'El email es requerido'
        if (!formData.first_name.trim())
            newErrors.first_name = 'El nombre es requerido'
        if (!formData.last_name.trim())
            newErrors.last_name = 'El apellido es requerido'
        if (!formData.password)
            newErrors.password = 'La contraseña es requerida'
        if (formData.password.length < 8)
            newErrors.password =
                'La contraseña debe tener al menos 8 caracteres'
        if (formData.password !== formData.password_confirm) {
            newErrors.password_confirm = 'Las contraseñas no coinciden'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    return (
        <form
            {...rest}
            className={`${Styles.registerForm} ${className ?? ''}`}
            onSubmit={handleSubmit}
        >
            <h2 className={Styles.formTitle}>Crear Cuenta</h2>

            <div className={Styles.formFields}>
                <Input
                    type="text"
                    label="Nombre de usuario"
                    value={formData.username}
                    onChange={handleChange('username')}
                    placeholder="usuario123"
                    error={errors.username}
                    disabled={isLoading}
                />

                <Input
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="tu@email.com"
                    error={errors.email}
                    disabled={isLoading}
                />

                <div className={Styles.formRow}>
                    <Input
                        type="text"
                        label="Nombre"
                        value={formData.first_name}
                        onChange={handleChange('first_name')}
                        placeholder="Juan"
                        error={errors.first_name}
                        disabled={isLoading}
                    />

                    <Input
                        type="text"
                        label="Apellido"
                        value={formData.last_name}
                        onChange={handleChange('last_name')}
                        placeholder="Pérez"
                        error={errors.last_name}
                        disabled={isLoading}
                    />
                </div>

                <Input
                    type="password"
                    label="Contraseña"
                    name='new_password'
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="••••••••"
                    error={errors.password}
                    disabled={isLoading}
                />

                <Input
                    type="password"
                    label="Confirmar contraseña"
                    name='password_confirm'
                    value={formData.password_confirm}
                    onChange={handleChange('password_confirm')}
                    placeholder="••••••••"
                    error={errors.password_confirm}
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
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Crear Cuenta
                </Button>
            </div>

            {onLoginClick && (
                <div className={Styles.formFooter}>
                    ¿Ya tienes cuenta?{' '}
                    <button
                        type="button"
                        className={Styles.formLink}
                        onClick={onLoginClick}
                        disabled={isLoading}
                    >
                        Inicia sesión aquí
                    </button>
                </div>
            )}
        </form>
    )
}
