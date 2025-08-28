import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button/Button';
import Styles from './MobileDrawer.module.css';

interface MobileDrawerProps extends ComponentProps<'div'> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const MobileDrawer = ({ 
  isOpen, 
  onClose, 
  children, 
  title = "Menu",
  className,
  ...rest 
}: MobileDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      // Guardar el elemento que tenía el foco
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Evitar scroll del body
      document.body.style.overflow = 'hidden';
      // Enfocar el drawer
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 100);
    } else if (isMounted) {
      setIsClosing(true);
      // Restaurar scroll del body
      document.body.style.overflow = '';
      // Devolver el foco al elemento anterior
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      // Esperar animación de salida antes de desmontar
      const timeout = setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, 300); // Duración de la animación en ms
      return () => clearTimeout(timeout);
    }
    return () => {
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isOpen || isClosing)) {
        onClose();
      }
    };

    if (isOpen || isClosing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isClosing, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFocus = (e: React.FocusEvent) => {
    // Trap focus within drawer
    if (!drawerRef.current?.contains(e.target as Node)) {
      drawerRef.current?.focus();
    }
  };

  if (!isMounted) return null;

  return (
    <div 
      className={`${Styles.overlay} ${isClosing ? Styles.closing : ''}`}
      onClick={handleBackdropClick}
      onFocus={handleFocus}
    >
      <div 
        {...rest}
        ref={drawerRef}
        className={`${Styles.drawer} ${className ?? ''} ${isClosing ? Styles.closing : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className={Styles.header}>
          <h2 className={Styles.title}>{title}</h2>
          <Button
            variant="ghost"
            size="small"
            onClick={onClose}
            className={Styles.closeButton}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className={Styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};