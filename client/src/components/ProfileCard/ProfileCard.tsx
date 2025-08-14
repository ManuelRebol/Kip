import { useState } from 'react'
import type { ComponentProps, PropsWithChildren } from 'react'
import { Button } from '../ui/Button/Button'
import Styles from './ProfileCard.module.css'
import { AuthModal } from '../auth/AuthModal/AuthModal'

type ProfileCardProps = ComponentProps<'section'> & {
    name: string
    role: string
    avatarUrl: string
}

export default function ProfileCard({
    name,
    role,
    avatarUrl,
    className,
    children,
    ...rest
}: PropsWithChildren<ProfileCardProps>) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'profile' | 'password'>(
        'profile'
    )

    const openModal = (mode: 'profile' | 'password') => {
        setModalMode(mode)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <section
                {...rest}
                className={`${Styles.profile} ${className ?? ''}`}
            >
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
                <Button
                    onClick={() => openModal('profile')}
                    variant="secondary"
                >
                    Editar
                </Button>
            </section>
            <AuthModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialMode={modalMode}
            />
        </>
    )
}
