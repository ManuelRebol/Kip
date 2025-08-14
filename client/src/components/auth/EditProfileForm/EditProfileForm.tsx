import type { ComponentProps } from 'react'
import { useState } from 'react'
import type { UpdateProfileData } from '../../../types'
import { Input } from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Styles from './EditProfileForm.module.css'

type Props = ComponentProps<'form'> & {
    onSubmit: (data: UpdateProfileData) => void
    onPasswordClick?: () => void
    isLoading?: boolean
    error?: string
    formData: UpdateProfileData;
    setFormData: (data: UpdateProfileData | ((prev: UpdateProfileData) => UpdateProfileData)) => void
}

export const EditProfileForm = ({
    onSubmit,
    isLoading = false,
    error,
    className,
    formData,
    setFormData,
    onPasswordClick,
    ...rest
}: Props) => {

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange =
        (field: keyof UpdateProfileData) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(({ ...formData, [field]: e.target.value }))
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
            className={`${Styles.updateProfileForm} ${className ?? ''}`}
            onSubmit={handleSubmit}
        >
            <h2 className={Styles.formTitle}>Editar Perfil</h2>

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
                    Actualizar
                </Button>
            </div>

            {onPasswordClick && (
                <div className={Styles.formFooter}>
                    ¿Desea{' '}
                    <button
                        type="button"
                        className={Styles.formLink}
                        onClick={onPasswordClick}
                        disabled={isLoading}
                    >
                        cambiar su contraseña?
                    </button>
                </div>
            )}
        </form>
    )
}
