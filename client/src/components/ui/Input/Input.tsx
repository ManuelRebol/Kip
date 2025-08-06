import type { ComponentProps, ReactNode } from 'react'
import Styles from './Input.module.css'

type InputProps = ComponentProps<'input'> & {
    label?: ReactNode
    error?: string
    containerClassName?: string
}

type TextareaProps = ComponentProps<'textarea'> & {
    label?: ReactNode
    error?: string
    containerClassName?: string
}

export const Input = ({
    label,
    error,
    className,
    containerClassName,
    id,
    ...rest
}: InputProps) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
        <div className={`${Styles.inputContainer} ${containerClassName ?? ''}`}>
            {label && (
                <label htmlFor={inputId} className={Styles.label}>
                    {label}
                </label>
            )}
            <input
                {...rest}
                id={inputId}
                className={`${Styles.input} ${error ? Styles.error : ''} ${
                    className ?? ''
                }`}
            />
            {error && <p className={Styles.errorMessage}>{error}</p>}
        </div>
    )
}

export const Textarea = ({
    label,
    error,
    className,
    containerClassName,
    id,
    ...rest
}: TextareaProps) => {
    const textareaId =
        id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    return (
        <div className={`${Styles.inputContainer} ${containerClassName ?? ''}`}>
            {label && (
                <label htmlFor={textareaId} className={Styles.label}>
                    {label}
                </label>
            )}
            <textarea
                {...rest}
                id={textareaId}
                className={`${Styles.input} ${Styles.textarea} ${
                    error ? Styles.error : ''
                } ${className ?? ''}`}
            />
            {error && <p className={Styles.errorMessage}>{error}</p>}
        </div>
    )
}
