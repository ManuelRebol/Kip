import type { ComponentProps, PropsWithChildren } from 'react'
import { Button } from '../ui/Button/Button'
import Styles from './ProfileCard.module.css'

type ProfileCardProps = ComponentProps<'section'> & {
    name: string
    role: string
    avatarUrl: string
    onEdit: () => void
}

export default function ProfileCard({
    name,
    role,
    avatarUrl,
    onEdit,
    className,
    children,
    ...rest
}: PropsWithChildren<ProfileCardProps>) {
    return (
        <section {...rest} className={`${Styles.profile} ${className ?? ''}`}>
            <img
                src={avatarUrl}
                alt={`Avatar de ${name}`}
                className={Styles.avatar}
            />
            <div className={Styles.info}>
                <h3 className={Styles.name}>{name}</h3>
                <p className={Styles.role}>{role}</p>
                {children}
            </div>
            <Button onClick={onEdit} variant="secondary">
                Editar
            </Button>
        </section>
    )
}
