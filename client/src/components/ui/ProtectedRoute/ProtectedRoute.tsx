import type { ComponentProps, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import Styles from './ProtectedRoute.module.css'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  requireAuth?: boolean
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  className,
  ...rest
}: Props) => {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div {...rest} className={`${Styles.loadingContainer} ${className ?? ''}`}>
        <div className={Styles.loadingSpinner}>
          <div className={Styles.spinner}></div>
          <p className={Styles.loadingText}>Cargando...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    // Redirige a landing si no está autenticado
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    // Redirige a dashboard si ya está autenticado y trata de acceder a rutas públicas
    return <Navigate to="/home" replace />
  }

  return <div {...rest} className={className}>{children}</div>
}