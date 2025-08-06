import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import Styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  loading?: boolean;
};

export const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  icon,
  loading = false,
  children, 
  className, 
  disabled,
  ...rest 
}: PropsWithChildren<Props>) => {
  const variantClass = Styles[variant];
  const sizeClass = size !== 'medium' ? Styles[size] : '';
  
  return (
    <button 
      {...rest} 
      className={`${Styles.button} ${variantClass} ${sizeClass} ${className ?? ''}`}
      disabled={disabled || loading}
    >
      {loading ? '...' : icon}
      {children}
    </button>
  );
};