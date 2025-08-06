import type { ComponentProps } from 'react'
import { useState } from 'react'
import { AuthModal } from '../../components/auth/AuthModal/AuthModal'
import Styles from './LandingPage.module.css'

type Props = ComponentProps<'main'>

export const LandingPage = ({ className, ...rest }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'login' | 'register'>('login')

    const openModal = (mode: 'login' | 'register') => {
        setModalMode(mode)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <main {...rest} className={`${Styles.landingPage} ${className ?? ''}`}>
            {/* Background Image */}
            <div className={Styles.backgroundContainer}>
                <div className={Styles.backgroundOverlay} />
            </div>

            {/* Content */}
            <div className={Styles.contentContainer}>
                <div className={Styles.heroSection}>
                    {/* Brand Section */}
                    <div className={Styles.brandSection}>
                        <h1 className={Styles.brandTitle}>Kip</h1>
                        <p className={Styles.brandDescription}>
                            La manera más simple y elegante de organizar tus
                            pensamientos. Crea, edita y gestiona tus notas desde
                            cualquier lugar.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className={Styles.featuresGrid}>
                        <div className={Styles.featureCard}>
                            <div className={Styles.featureIcon}>
                                <svg
                                    className={Styles.featureIconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>
                            <h3 className={Styles.featureTitle}>
                                Fácil de usar
                            </h3>
                            <p className={Styles.featureDescription}>
                                Interfaz intuitiva para escribir sin
                                distracciones
                            </p>
                        </div>

                        <div className={Styles.featureCard}>
                            <div className={Styles.featureIcon}>
                                <svg
                                    className={Styles.featureIconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className={Styles.featureTitle}>Seguro</h3>
                            <p className={Styles.featureDescription}>
                                Tus notas están protegidas y sincronizadas
                            </p>
                        </div>

                        <div className={Styles.featureCard}>
                            <div className={Styles.featureIcon}>
                                <svg
                                    className={Styles.featureIconSvg}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className={Styles.featureTitle}>Organizado</h3>
                            <p className={Styles.featureDescription}>
                                Encuentra tus notas rápidamente con etiquetas
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className={Styles.ctaSection}>
                        <button
                            onClick={() => openModal('register')}
                            className={`${Styles.ctaButton} ${Styles.ctaPrimary}`}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialMode={modalMode}
            />
        </main>
    )
}
